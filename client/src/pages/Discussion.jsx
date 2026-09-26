import { useState, useEffect } from "react";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "./DashboardLayout";
import { useSettings } from "../context/SettingsContext";
import { toast } from "react-toastify";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);

const CATEGORIES = ["all", "general", "infrastructure", "water", "waste", "electricity", "roads", "announcement"];

const CATEGORY_META = {
  general:        { icon: "💬", color: "#6b7280" },
  infrastructure: { icon: "🏗️", color: "#f59e0b" },
  water:          { icon: "💧", color: "#3b82f6" },
  waste:          { icon: "🚛", color: "#10b981" },
  electricity:    { icon: "⚡", color: "#eab308" },
  roads:          { icon: "🛣️", color: "#8b5cf6" },
  announcement:   { icon: "📢", color: "#ef4444" },
};

// ── New Thread Form ──────────────────────────────────────────────────────────
const NewThreadForm = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({ title: "", content: "", category: "general" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required"); return;
    }
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="new-thread-form">
      <h3>💬 Start a New Discussion</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">Title *</label>
          <input className="form-input" placeholder="What's on your mind?"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            maxLength={200} />
        </div>
        <div className="form-row">
          <label className="form-label">Category</label>
          <select className="form-select" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.filter(c => c !== "all").map(c => (
              <option key={c} value={c}>{CATEGORY_META[c]?.icon} {c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label className="form-label">Content *</label>
          <textarea className="form-textarea" rows={4}
            placeholder="Describe your question, suggestion, or issue in detail..."
            value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
            maxLength={5000} />
          <span className="char-count">{form.content.length}/5000</span>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Posting..." : "📬 Post Discussion"}
          </button>
        </div>
      </form>
    </div>
  );
};

// ── Thread Detail (with replies) ─────────────────────────────────────────────
const ThreadDetail = ({ threadId, onBack, currentUser, isAdmin }) => {
  const [thread, setThread] = useState(null);
  const [reply, setReply]   = useState("");
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    customFetch.get(`/discussions/${threadId}`)
      .then(({ data }) => setThread(data.discussion))
      .catch(() => toast.error("Failed to load discussion"))
      .finally(() => setLoading(false));
  }, [threadId]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setReplying(true);
    try {
      const { data } = await customFetch.post(`/discussions/${threadId}/reply`, { content: reply });
      setThread(prev => ({ ...prev, replies: data.replies }));
      setReply("");
      toast.success("Reply posted");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to post reply");
    } finally { setReplying(false); }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      await customFetch.delete(`/discussions/${threadId}/reply/${replyId}`);
      setThread(prev => ({ ...prev, replies: prev.replies.filter(r => r._id !== replyId) }));
      toast.success("Reply deleted");
    } catch (err) { toast.error("Failed to delete reply"); }
  };

  const handleTogglePin = async () => {
    try {
      const { data } = await customFetch.patch(`/discussions/${threadId}/pin`);
      setThread(prev => ({ ...prev, pinned: data.pinned }));
      toast.success(data.pinned ? "Thread pinned" : "Thread unpinned");
    } catch (err) { toast.error("Failed to pin thread"); }
  };

  const handleToggleClose = async () => {
    try {
      const { data } = await customFetch.patch(`/discussions/${threadId}/close`);
      setThread(prev => ({ ...prev, closed: data.closed }));
      toast.success(data.closed ? "Thread closed" : "Thread reopened");
    } catch (err) { toast.error("Failed to update thread"); }
  };

  if (loading) return <div className="loading-center"><div className="loading" /></div>;
  if (!thread) return <div className="empty-state"><span>Discussion not found</span></div>;

  const meta = CATEGORY_META[thread.category] || { icon: "💬", color: "#6b7280" };

  return (
    <div className="thread-detail">
      <button className="btn-back" onClick={onBack}>← Back to Discussions</button>

      <div className="thread-main">
        <div className="thread-meta">
          <span className="cat-badge" style={{ background: meta.color + "22", color: meta.color }}>
            {meta.icon} {thread.category}
          </span>
          {thread.pinned && <span className="pin-badge">📌 Pinned</span>}
          {thread.closed && <span className="closed-badge">🔒 Closed</span>}
        </div>
        <h2 className="thread-title">{thread.title}</h2>
        <div className="thread-author-row">
          <div className="author-avatar">
            {thread.author?.avatar
              ? <img src={thread.author.avatar} alt="" />
              : <span>{thread.author?.name?.charAt(0)}</span>}
          </div>
          <div>
            <span className="author-name">{thread.author?.name} {thread.author?.lastName}</span>
            {thread.author?.role === "admin" && <span className="admin-tag"> Admin</span>}
            <span className="post-time"> · {day(thread.createdAt).fromNow()}</span>
          </div>
        </div>
        <p className="thread-content">{thread.content}</p>

        {isAdmin && (
          <div className="admin-controls">
            <button className="btn-admin" onClick={handleTogglePin}>
              {thread.pinned ? "📌 Unpin" : "📌 Pin"}
            </button>
            <button className="btn-admin danger" onClick={handleToggleClose}>
              {thread.closed ? "🔓 Reopen" : "🔒 Close"}
            </button>
          </div>
        )}
      </div>

      {/* Replies */}
      <div className="replies-section">
        <h4>{thread.replies?.length || 0} Replies</h4>
        {thread.replies?.length === 0 && (
          <div className="no-replies">No replies yet. Be the first to respond!</div>
        )}
        {thread.replies?.map(r => (
          <div key={r._id} className="reply-card">
            <div className="reply-author">
              <div className="author-avatar sm">
                {r.author?.avatar
                  ? <img src={r.author.avatar} alt="" />
                  : <span>{r.author?.name?.charAt(0)}</span>}
              </div>
              <div>
                <span className="author-name">{r.author?.name} {r.author?.lastName}</span>
                {r.author?.role === "admin" && <span className="admin-tag"> Admin</span>}
                <span className="post-time"> · {day(r.createdAt).fromNow()}</span>
              </div>
              {(isAdmin || r.author?._id === currentUser?._id) && (
                <button className="btn-delete-reply" onClick={() => handleDeleteReply(r._id)} title="Delete reply">✕</button>
              )}
            </div>
            <p className="reply-content">{r.content}</p>
          </div>
        ))}
      </div>

      {/* Reply form */}
      {!thread.closed ? (
        <form className="reply-form" onSubmit={handleReply}>
          <h4>Write a Reply</h4>
          <textarea className="form-textarea" rows={3}
            placeholder="Share your thoughts..."
            value={reply} onChange={(e) => setReply(e.target.value)}
            maxLength={2000} />
          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={replying || !reply.trim()}>
              {replying ? "Posting..." : "💬 Post Reply"}
            </button>
          </div>
        </form>
      ) : (
        <div className="closed-notice">🔒 This discussion is closed. No new replies can be added.</div>
      )}
    </div>
  );
};

// ── Main Discussion Page ──────────────────────────────────────────────────────
const Discussion = () => {
  const { user } = useDashboardContext();
  const { t }   = useSettings();
  const isAdmin  = user?.role === "admin";

  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [category, setCategory]       = useState("all");
  const [search, setSearch]           = useState("");
  const [page, setPage]               = useState(1);
  const [numOfPages, setNumOfPages]   = useState(1);
  const [total, setTotal]             = useState(0);
  const [showNewForm, setShowNewForm] = useState(false);
  const [activeThread, setActiveThread] = useState(null);

  const fetchDiscussions = async (cat = category, q = search, pg = 1) => {
    setLoading(true);
    try {
      const params = { page: pg, limit: 10 };
      if (cat !== "all") params.category = cat;
      if (q.trim()) params.search = q.trim();
      const { data } = await customFetch.get("/discussions", { params });
      setDiscussions(data.discussions);
      setNumOfPages(data.numOfPages);
      setTotal(data.total);
      setPage(pg);
    } catch (_) { toast.error("Failed to load discussions"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDiscussions(); }, []);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    fetchDiscussions(cat, search, 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDiscussions(category, search, 1);
  };

  const handleCreate = async (form) => {
    try {
      const { data } = await customFetch.post("/discussions", form);
      toast.success("Discussion posted!");
      setShowNewForm(false);
      setActiveThread(data.discussion._id);
    } catch (err) { toast.error(err?.response?.data?.msg || "Failed to post"); }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this discussion?")) return;
    try {
      await customFetch.delete(`/discussions/${id}`);
      setDiscussions(prev => prev.filter(d => d._id !== id));
      toast.success("Discussion deleted");
    } catch (err) { toast.error("Failed to delete"); }
  };

  // Show thread detail
  if (activeThread) {
    return (
      <PageWrapper>
        <ThreadDetail
          threadId={activeThread}
          onBack={() => { setActiveThread(null); fetchDiscussions(); }}
          currentUser={user}
          isAdmin={isAdmin}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div className="disc-header">
        <div>
          <h2>💬 Community Discussion Forum</h2>
          <p className="header-sub">Share ideas, ask questions, and engage with Worabe Municipality</p>
        </div>
        <button className="btn-new" onClick={() => setShowNewForm(true)}>
          ✏️ New Discussion
        </button>
      </div>

      {/* New Thread Form */}
      {showNewForm && (
        <NewThreadForm onSubmit={handleCreate} onCancel={() => setShowNewForm(false)} />
      )}

      {/* Search + Category filters */}
      <div className="disc-filters">
        <form className="search-form" onSubmit={handleSearch}>
          <input className="search-input" placeholder="🔎 Search discussions..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn-search">Search</button>
        </form>
        <div className="cat-tabs">
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-tab ${category === c ? "active" : ""}`}
              onClick={() => handleCategoryChange(c)}>
              {c !== "all" && CATEGORY_META[c]?.icon + " "}
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="results-count">{total} discussion{total !== 1 ? "s" : ""}</p>

      {/* Thread list */}
      {loading ? (
        <div className="loading-center"><div className="loading" /></div>
      ) : discussions.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">💬</span>
          <h4>No discussions yet</h4>
          <p>Be the first to start a conversation!</p>
        </div>
      ) : (
        <div className="disc-list">
          {discussions.map(d => {
            const meta = CATEGORY_META[d.category] || { icon: "💬", color: "#6b7280" };
            return (
              <div key={d._id} className="disc-card" onClick={() => setActiveThread(d._id)}>
                <div className="disc-card-left">
                  <div className="disc-icon" style={{ background: meta.color + "22", color: meta.color }}>
                    {meta.icon}
                  </div>
                  <div className="disc-info">
                    <div className="disc-top">
                      <span className="cat-badge-sm" style={{ color: meta.color }}>{d.category}</span>
                      {d.pinned && <span className="pin-sm">📌</span>}
                      {d.closed && <span className="closed-sm">🔒</span>}
                    </div>
                    <h3 className="disc-title">{d.title}</h3>
                    <div className="disc-meta">
                      <span>{d.author?.name} {d.author?.lastName}</span>
                      {d.author?.role === "admin" && <span className="admin-tag">Admin</span>}
                      <span>·</span>
                      <span>{day(d.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </div>
                <div className="disc-card-right">
                  <div className="reply-count">
                    <span>💬</span>
                    <span className="reply-num">{d.replyCount || 0}</span>
                  </div>
                  {(isAdmin || d.author?._id === user?._id) && (
                    <button className="btn-del" onClick={(e) => handleDelete(d._id, e)} title="Delete">🗑️</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {numOfPages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => fetchDiscussions(category, search, page - 1)}>← Prev</button>
          <span>Page {page} of {numOfPages}</span>
          <button disabled={page >= numOfPages} onClick={() => fetchDiscussions(category, search, page + 1)}>Next →</button>
        </div>
      )}
    </PageWrapper>
  );
};

// ── Styles ───────────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  padding: 0.5rem 0 3rem;

  .disc-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;
    h2 { font-size: 1.4rem; font-weight: 800; color: var(--text-color); margin: 0 0 0.25rem; }
    .header-sub { color: var(--text-secondary-color); font-size: 0.85rem; margin: 0; }
  }
  .btn-new {
    padding: 0.65rem 1.25rem; background: var(--primary-accent); color: white;
    border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
    &:hover { background: #e05500; transform: translateY(-1px); }
  }

  /* New thread form */
  .new-thread-form {
    background: var(--background-secondary-color); border-radius: 14px;
    padding: 1.5rem; border: 1px solid var(--border-color); margin-bottom: 1.5rem;
    box-shadow: var(--shadow-2);
    h3 { font-size: 1.05rem; font-weight: 700; color: var(--text-color); margin: 0 0 1.25rem; }
  }

  .form-row { margin-bottom: 1rem;
    .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-color); margin-bottom: 0.4rem; }
  }
  .char-count { font-size: 0.75rem; color: var(--text-secondary-color); float: right; }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 0.65rem 0.9rem; border: 1.5px solid var(--border-color);
    border-radius: 8px; background: var(--input-bg, var(--background-color)); color: var(--text-color);
    font-size: 0.9rem; font-family: inherit;
    &:focus { outline: none; border-color: var(--primary-accent); box-shadow: 0 0 0 3px rgba(255,96,0,0.1); }
  }
  .form-textarea { resize: vertical; min-height: 100px; }
  .form-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem; }
  .btn-cancel {
    padding: 0.6rem 1.25rem; background: var(--grey-100); color: var(--text-color);
    border: 1.5px solid var(--border-color); border-radius: 8px; font-weight: 500; cursor: pointer;
    &:hover { background: var(--grey-200); }
  }
  .btn-submit {
    padding: 0.6rem 1.5rem; background: var(--primary-accent); color: white;
    border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    &:hover { background: #e05500; }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }

  /* Filters */
  .disc-filters { margin-bottom: 1.25rem; }
  .search-form { display: flex; gap: 0.5rem; margin-bottom: 0.85rem; }
  .search-input {
    flex: 1; padding: 0.6rem 0.9rem; border: 1.5px solid var(--border-color);
    border-radius: 8px; background: var(--background-secondary-color); color: var(--text-color);
    font-size: 0.9rem;
    &:focus { outline: none; border-color: var(--primary-accent); }
  }
  .btn-search {
    padding: 0.6rem 1.1rem; background: var(--primary-accent); color: white;
    border: none; border-radius: 8px; font-weight: 600; cursor: pointer; white-space: nowrap;
    &:hover { background: #e05500; }
  }
  .cat-tabs { display: flex; gap: 0.35rem; flex-wrap: wrap; }
  .cat-tab {
    padding: 0.4rem 0.85rem; border-radius: 20px; border: 1.5px solid var(--border-color);
    background: var(--background-secondary-color); color: var(--text-secondary-color);
    font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
    &:hover { border-color: var(--primary-accent); color: var(--primary-accent); }
    &.active { background: var(--primary-accent); border-color: var(--primary-accent); color: white; }
  }

  .results-count { font-size: 0.82rem; color: var(--text-secondary-color); margin-bottom: 1rem; }

  /* Discussion list */
  .disc-list { display: flex; flex-direction: column; gap: 0.65rem; }
  .disc-card {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    padding: 1rem 1.25rem; background: var(--background-secondary-color);
    border-radius: 12px; border: 1px solid var(--border-color); cursor: pointer;
    transition: all 0.2s;
    &:hover { transform: translateY(-1px); box-shadow: var(--shadow-2); border-color: rgba(255,96,0,0.2); }
  }
  .disc-card-left { display: flex; align-items: flex-start; gap: 0.85rem; flex: 1; min-width: 0; }
  .disc-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
  .disc-info { flex: 1; min-width: 0; }
  .disc-top { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
  .cat-badge-sm { font-size: 0.72rem; font-weight: 700; text-transform: capitalize; }
  .pin-sm, .closed-sm { font-size: 0.75rem; }
  .disc-title { font-size: 0.95rem; font-weight: 700; color: var(--text-color); margin: 0 0 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .disc-meta { font-size: 0.78rem; color: var(--text-secondary-color); display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
  .admin-tag { color: var(--primary-accent); font-weight: 700; font-size: 0.75rem; }
  .disc-card-right { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
  .reply-count { display: flex; align-items: center; gap: 0.25rem; color: var(--text-secondary-color); font-size: 0.82rem; }
  .reply-num { font-weight: 700; color: var(--text-color); }
  .btn-del { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 0.25rem; opacity: 0.6; &:hover { opacity: 1; } }

  /* Thread detail */
  .thread-detail { display: flex; flex-direction: column; gap: 1.5rem; }
  .btn-back { background: none; border: none; color: var(--primary-accent); font-size: 0.9rem; font-weight: 600; cursor: pointer; padding: 0; &:hover { text-decoration: underline; } }
  .thread-main { background: var(--background-secondary-color); border-radius: 14px; padding: 1.5rem; border: 1px solid var(--border-color); }
  .thread-meta { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
  .cat-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.78rem; font-weight: 700; text-transform: capitalize; }
  .pin-badge { background: rgba(255,96,0,0.1); color: var(--primary-accent); padding: 0.25rem 0.65rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
  .closed-badge { background: rgba(107,114,128,0.1); color: #6b7280; padding: 0.25rem 0.65rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
  .thread-title { font-size: 1.3rem; font-weight: 800; color: var(--text-color); margin: 0 0 0.75rem; line-height: 1.3; }
  .thread-author-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
  .author-avatar { width: 36px; height: 36px; border-radius: 50%; overflow: hidden; background: var(--primary-accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1rem; flex-shrink: 0;
    img { width: 100%; height: 100%; object-fit: cover; }
    &.sm { width: 30px; height: 30px; font-size: 0.85rem; }
  }
  .author-name { font-size: 0.9rem; font-weight: 600; color: var(--text-color); }
  .post-time { font-size: 0.8rem; color: var(--text-secondary-color); }
  .thread-content { font-size: 0.95rem; color: var(--text-color); line-height: 1.7; white-space: pre-wrap; }
  .admin-controls { display: flex; gap: 0.75rem; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-color); }
  .btn-admin { padding: 0.5rem 1rem; border: 1.5px solid var(--border-color); border-radius: 8px; background: var(--background-color); color: var(--text-color); font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    &:hover { border-color: var(--primary-accent); color: var(--primary-accent); }
    &.danger:hover { border-color: #dc2626; color: #dc2626; }
  }
  .replies-section { background: var(--background-secondary-color); border-radius: 14px; padding: 1.5rem; border: 1px solid var(--border-color);
    h4 { font-size: 1rem; font-weight: 700; color: var(--text-color); margin: 0 0 1rem; }
  }
  .no-replies { text-align: center; color: var(--text-secondary-color); padding: 1.5rem 0; font-size: 0.88rem; }
  .reply-card { background: var(--background-color); border-radius: 10px; padding: 1rem; margin-bottom: 0.75rem; border: 1px solid var(--border-color); }
  .reply-author { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem; }
  .btn-delete-reply { margin-left: auto; background: none; border: none; cursor: pointer; color: var(--text-secondary-color); font-size: 0.8rem; opacity: 0.6; &:hover { opacity: 1; color: #dc2626; } }
  .reply-content { font-size: 0.88rem; color: var(--text-color); line-height: 1.6; white-space: pre-wrap; margin: 0; }
  .reply-form { background: var(--background-secondary-color); border-radius: 14px; padding: 1.5rem; border: 1px solid var(--border-color);
    h4 { font-size: 0.95rem; font-weight: 700; color: var(--text-color); margin: 0 0 0.85rem; }
  }
  .closed-notice { background: rgba(107,114,128,0.08); border: 1px solid rgba(107,114,128,0.2); border-radius: 10px; padding: 1rem 1.25rem; text-align: center; color: #6b7280; font-size: 0.88rem; }

  /* Empty state */
  .empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 4rem 2rem; color: var(--text-secondary-color);
    .empty-icon { font-size: 3rem; }
    h4 { color: var(--text-color); margin: 0; }
    p { margin: 0; font-size: 0.88rem; }
  }

  /* Pagination */
  .pagination { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 1.5rem;
    button { padding: 0.5rem 1rem; border: 1.5px solid var(--border-color); border-radius: 8px; background: var(--background-secondary-color); color: var(--text-color); cursor: pointer; font-weight: 500;
      &:hover:not(:disabled) { border-color: var(--primary-accent); color: var(--primary-accent); }
      &:disabled { opacity: 0.4; cursor: not-allowed; }
    }
    span { font-size: 0.88rem; color: var(--text-secondary-color); }
  }

  .loading-center { display: flex; justify-content: center; padding: 3rem; }
`;

export default Discussion;
