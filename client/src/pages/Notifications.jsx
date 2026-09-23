import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNotifications } from "../context/NotificationContext";
import { useDashboardContext } from "./DashboardLayout";
import { useSettings } from "../context/SettingsContext";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);

// ── Type icons & colors ─────────────────────────────────────────────────────
const TYPE_META = {
  complaint_submitted:  { icon: "📋", color: "#3b82f6", label: "New Complaint" },
  status_updated:       { icon: "🔄", color: "#f59e0b", label: "Status Updated" },
  complaint_resolved:   { icon: "✅", color: "#10b981", label: "Resolved" },
  complaint_closed:     { icon: "🔒", color: "#6b7280", label: "Closed" },
  admin_message:        { icon: "📨", color: "#8b5cf6", label: "Admin Message" },
  new_user_registered:  { icon: "👤", color: "#0ea5e9", label: "New User" },
};

// ── Admin Send Message Modal ─────────────────────────────────────────────────
const SendMessageModal = ({ onClose, onSend }) => {
  const [users, setUsers]       = useState([]);
  const [form, setForm]         = useState({ recipientId: "", title: "", message: "" });
  const [sending, setSending]   = useState(false);

  useEffect(() => {
    customFetch.get("/users/admin/all-users")
      .then(({ data }) => setUsers(data.users || []))
      .catch(() => {});
  }, []);

  const handleSend = async () => {
    if (!form.recipientId || !form.title || !form.message) {
      toast.error("Please fill all fields"); return;
    }
    setSending(true);
    const ok = await onSend(form);
    setSending(false);
    if (ok) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>📨 Send Message to Citizen</h3>

        <div className="form-row">
          <label className="form-label">Select Citizen</label>
          <select className="form-select"
            value={form.recipientId}
            onChange={(e) => setForm({ ...form, recipientId: e.target.value })}>
            <option value="">-- Select user --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} {u.lastName} — {u.email}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">Subject / Title</label>
          <input className="form-input" placeholder="e.g. Update on your complaint"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div className="form-row">
          <label className="form-label">Message</label>
          <textarea className="form-textarea" rows={4}
            placeholder="Write your message here..."
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-send" onClick={handleSend} disabled={sending}>
            {sending ? "Sending..." : "📨 Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Notifications Page ───────────────────────────────────────────────────
const Notifications = () => {
  const {
    notifications, unreadCount, loading, page, numOfPages,
    fetchNotifications, markAsRead, markAllAsRead, deleteNotification, clearAll, sendAdminMessage,
  } = useNotifications();
  const { user } = useDashboardContext();
  const { t }   = useSettings();
  const isAdmin  = user?.role === "admin";

  const [filter, setFilter]         = useState("all"); // all | unread | read
  const [showModal, setShowModal]   = useState(false);

  useEffect(() => { fetchNotifications(1); }, []);

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read")   return n.isRead;
    return true;
  });

  const handleClick = (n) => {
    if (!n.isRead) markAsRead(n._id);
  };

  const loadMore = () => {
    if (page < numOfPages) fetchNotifications(page + 1);
  };

  return (
    <PageWrapper>
      {/* Header */}
      <div className="notif-header">
        <div>
          <h2>🔔 Notifications
            {unreadCount > 0 && <span className="header-badge">{unreadCount}</span>}
          </h2>
          <p className="header-sub">
            {isAdmin ? "System-wide alerts and citizen messages" : "Updates on your complaints and messages from the municipality"}
          </p>
        </div>
        <div className="header-actions">
          {isAdmin && (
            <button className="btn-compose" onClick={() => setShowModal(true)}>
              📨 Send Message
            </button>
          )}
          {unreadCount > 0 && (
            <button className="btn-read-all" onClick={markAllAsRead}>
              ✓ Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button className="btn-clear" onClick={clearAll}>
              🗑️ Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {["all","unread","read"].map((f) => (
          <button key={f} className={`tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}>
            {f === "all" ? `All (${notifications.length})` :
             f === "unread" ? `Unread (${notifications.filter(n=>!n.isRead).length})` :
             `Read (${notifications.filter(n=>n.isRead).length})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="notif-list">
        {loading && notifications.length === 0 ? (
          <div className="empty-state">
            <div className="loading"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔕</span>
            <h4>No notifications</h4>
            <p>{filter === "unread" ? "You're all caught up!" : "Nothing here yet."}</p>
          </div>
        ) : (
          filtered.map((n) => {
            const meta = TYPE_META[n.type] || { icon: "🔔", color: "#ff6000", label: n.type };
            return (
              <div key={n._id}
                className={`notif-item ${!n.isRead ? "unread" : ""}`}
                onClick={() => handleClick(n)}>
                <div className="notif-icon" style={{ background: meta.color + "22", border: `1px solid ${meta.color}44` }}>
                  <span>{meta.icon}</span>
                </div>
                <div className="notif-body">
                  <div className="notif-top">
                    <span className="notif-type-badge" style={{ color: meta.color }}>{meta.label}</span>
                    <span className="notif-time">{day(n.createdAt).fromNow()}</span>
                  </div>
                  <p className="notif-title">{n.title}</p>
                  <p className="notif-message">{n.message}</p>
                  {n.sender?.name && (
                    <p className="notif-sender">
                      From: {n.sender.name} {n.sender.lastName}
                      {n.sender.role === "admin" && <span className="admin-tag"> (Admin)</span>}
                    </p>
                  )}
                </div>
                <div className="notif-actions">
                  {!n.isRead && (
                    <button className="action-btn read-btn"
                      title="Mark as read"
                      onClick={(e) => { e.stopPropagation(); markAsRead(n._id); }}>✓</button>
                  )}
                  <button className="action-btn del-btn"
                    title="Delete"
                    onClick={(e) => { e.stopPropagation(); deleteNotification(n._id); }}>✕</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load more */}
      {page < numOfPages && (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button className="btn-read-all" onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Admin compose modal */}
      {showModal && (
        <SendMessageModal
          onClose={() => setShowModal(false)}
          onSend={sendAdminMessage}
        />
      )}
    </PageWrapper>
  );
};

// ── Styles ───────────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  padding: 0.5rem 0 2rem;

  .notif-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;

    h2 { font-size: 1.4rem; font-weight: 800; color: var(--text-color); margin: 0 0 0.3rem;
      display: flex; align-items: center; gap: 0.6rem; }
    .header-badge {
      background: var(--primary-accent); color: white; font-size: 0.75rem;
      padding: 0.15rem 0.55rem; border-radius: 20px; font-weight: 700; }
    .header-sub { color: var(--text-secondary-color); font-size: 0.85rem; margin: 0; }
  }

  .header-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center; }

  .btn-compose {
    padding: 0.6rem 1.1rem; background: #8b5cf6; color: white; border: none;
    border-radius: 8px; font-size: 0.88rem; font-weight: 600; cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #7c3aed; transform: translateY(-1px); }
  }
  .btn-read-all {
    padding: 0.55rem 1rem; background: rgba(16,185,129,0.1); color: #059669;
    border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; font-size: 0.85rem;
    font-weight: 600; cursor: pointer; transition: all 0.2s;
    &:hover { background: rgba(16,185,129,0.2); }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }
  .btn-clear {
    padding: 0.55rem 1rem; background: rgba(239,68,68,0.08); color: #dc2626;
    border: 1px solid rgba(239,68,68,0.2); border-radius: 8px; font-size: 0.85rem;
    font-weight: 600; cursor: pointer; transition: all 0.2s;
    &:hover { background: rgba(239,68,68,0.15); }
  }

  /* Tabs */
  .filter-tabs {
    display: flex; gap: 0.4rem; margin-bottom: 1.25rem; flex-wrap: wrap;
  }
  .tab {
    padding: 0.5rem 1.1rem; border-radius: 8px; border: 1.5px solid var(--border-color);
    background: var(--background-secondary-color); color: var(--text-secondary-color);
    font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
    &:hover { border-color: var(--primary-accent); color: var(--primary-accent); }
    &.active { background: var(--primary-accent); border-color: var(--primary-accent); color: white; font-weight: 700; }
  }

  /* Notification list */
  .notif-list { display: flex; flex-direction: column; gap: 0.6rem; }

  .notif-item {
    display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.25rem;
    background: var(--background-secondary-color); border-radius: 12px;
    border: 1px solid var(--border-color); cursor: pointer;
    transition: all 0.2s; position: relative;

    &.unread {
      border-left: 3px solid var(--primary-accent);
      background: rgba(255,96,0,0.04);
      &::before { content: ""; position: absolute; top: 0.9rem; right: 1rem;
        width: 8px; height: 8px; border-radius: 50%; background: var(--primary-accent); }
    }
    &:hover { transform: translateY(-1px); box-shadow: var(--shadow-2); }
  }

  .notif-icon {
    width: 42px; height: 42px; border-radius: 10px; display: flex;
    align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;
  }

  .notif-body { flex: 1; min-width: 0; }

  .notif-top {
    display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.3rem; flex-wrap: wrap;
  }
  .notif-type-badge { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .notif-time { font-size: 0.75rem; color: var(--text-secondary-color); margin-left: auto; }

  .notif-title {
    font-size: 0.93rem; font-weight: 700; color: var(--text-color);
    margin: 0 0 0.2rem; line-height: 1.4;
  }
  .notif-message { font-size: 0.84rem; color: var(--text-secondary-color); margin: 0; line-height: 1.5; }
  .notif-sender { font-size: 0.78rem; color: var(--grey-400); margin: 0.3rem 0 0; }
  .admin-tag { color: var(--primary-accent); font-weight: 600; }

  .notif-actions {
    display: flex; flex-direction: column; gap: 0.35rem; flex-shrink: 0;
  }
  .action-btn {
    width: 28px; height: 28px; border-radius: 6px; border: none; cursor: pointer;
    font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    &.read-btn { background: rgba(16,185,129,0.1); color: #059669; &:hover { background: #059669; color: white; } }
    &.del-btn  { background: rgba(239,68,68,0.1);  color: #dc2626; &:hover { background: #dc2626; color: white; } }
  }

  /* Empty state */
  .empty-state {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 4rem 2rem; color: var(--text-secondary-color); gap: 0.75rem;
    .empty-icon { font-size: 3rem; }
    h4 { color: var(--text-color); margin: 0; font-size: 1.1rem; }
    p  { margin: 0; font-size: 0.88rem; }
  }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1rem;
  }
  .modal {
    background: var(--background-secondary-color); border-radius: 16px; padding: 2rem;
    max-width: 480px; width: 100%; border: 1px solid var(--border-color);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation: popIn 0.22s ease;
    h3 { font-size: 1.15rem; font-weight: 700; color: var(--text-color); margin: 0 0 1.5rem; }
  }
  @keyframes popIn { from { opacity:0; transform:scale(0.93); } to { opacity:1; transform:scale(1); } }

  .form-row { margin-bottom: 1rem;
    .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-color); margin-bottom: 0.4rem; }
  }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 0.65rem 0.9rem; border: 1.5px solid var(--border-color);
    border-radius: 8px; background: var(--input-bg); color: var(--text-color);
    font-size: 0.9rem; font-family: inherit;
    &:focus { outline: none; border-color: var(--primary-accent); box-shadow: 0 0 0 3px rgba(255,96,0,0.1); }
  }
  .form-textarea { resize: vertical; min-height: 90px; }

  .modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem; }
  .btn-cancel {
    padding: 0.6rem 1.25rem; background: var(--grey-100); color: var(--text-color);
    border: 1.5px solid var(--border-color); border-radius: 8px; cursor: pointer; font-weight: 500;
    &:hover { background: var(--grey-200); }
  }
  .btn-send {
    padding: 0.6rem 1.5rem; background: #8b5cf6; color: white; border: none;
    border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    &:hover { background: #7c3aed; }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }
`;

export default Notifications;
