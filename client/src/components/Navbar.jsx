import React, { useState, useRef, useEffect } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import {
  FaAlignLeft, FaUserCircle, FaChevronDown, FaCog, FaMoon, FaSun, FaBell,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useSettings } from "../context/SettingsContext";
import { useNotifications } from "../context/NotificationContext";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);

const TYPE_ICONS = {
  complaint_submitted:  "📋",
  status_updated:       "🔄",
  complaint_resolved:   "✅",
  complaint_closed:     "🔒",
  admin_message:        "📨",
  new_user_registered:  "👤",
};

const Navbar = () => {
  const { toggleSidebar, user, logoutUser, toggleDarkTheme, isDarkTheme } = useDashboardContext();
  const { t } = useSettings();
  const { unreadCount, notifications, fetchNotifications, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showBell,     setShowBell]     = useState(false);

  const dropdownRef = useRef(null);
  const bellRef     = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
      if (bellRef.current     && !bellRef.current.contains(e.target))     setShowBell(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleBellOpen = () => {
    if (!showBell) fetchNotifications(1);
    setShowBell((p) => !p);
  };

  const recentNotifs = notifications.slice(0, 5);

  return (
    <Wrapper>
      <div className="nav-center">

        {/* LEFT: Hamburger */}
        <div className="nav-left">
          <button type="button" className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle menu">
            <FaAlignLeft />
          </button>
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          {/* Theme */}
          <button type="button" className="icon-btn" onClick={toggleDarkTheme}
            aria-label="Toggle theme" title={isDarkTheme ? "Light Mode" : "Dark Mode"}>
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </button>

          {/* Settings */}
          <Link to="/dashboard/settings" className="icon-btn" title="Settings">
            <FaCog />
          </Link>

          {/* ── Bell / Notifications ── */}
          <div className="bell-container" ref={bellRef}>
            <button type="button" className="icon-btn bell-btn" onClick={handleBellOpen}
              aria-label="Notifications">
              <FaBell />
              {unreadCount > 0 && (
                <span className="bell-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
              )}
            </button>

            {showBell && (
              <div className="bell-dropdown">
                <div className="bell-head">
                  <span>🔔 Notifications</span>
                  <div style={{ display:"flex", gap:"0.5rem" }}>
                    {unreadCount > 0 && (
                      <button className="bell-action" onClick={markAllAsRead}>Mark all read</button>
                    )}
                    <button className="bell-action primary"
                      onClick={() => { setShowBell(false); navigate("/dashboard/notifications"); }}>
                      View all
                    </button>
                  </div>
                </div>

                {recentNotifs.length === 0 ? (
                  <div className="bell-empty">🔕 No notifications yet</div>
                ) : (
                  recentNotifs.map((n) => (
                    <div key={n._id}
                      className={`bell-item ${!n.isRead ? "unread" : ""}`}
                      onClick={() => {
                        markAsRead(n._id);
                        setShowBell(false);
                        navigate("/dashboard/notifications");
                      }}>
                      <span className="bell-item-icon">
                        {TYPE_ICONS[n.type] || "🔔"}
                      </span>
                      <div className="bell-item-body">
                        <p className="bell-item-title">{n.title}</p>
                        <p className="bell-item-time">{day(n.createdAt).fromNow()}</p>
                      </div>
                      {!n.isRead && <span className="bell-dot" />}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* ── User profile ── */}
          <div className="profile-container" ref={dropdownRef}>
            <button type="button" className="profile-btn"
              onClick={() => setShowDropdown((p) => !p)}
              aria-label="User menu" aria-expanded={showDropdown}>
              {user?.avatar
                ? <img src={user.avatar} alt={user.name} className="profile-img" />
                : <FaUserCircle className="profile-icon" />}
              <span className="profile-name">{user?.name}</span>
              <FaChevronDown className={`chevron ${showDropdown ? "open" : ""}`} />
            </button>

            {showDropdown && (
              <div className="dropdown">
                <div className="dropdown-head">
                  <div className="dropdown-avatar">
                    {user?.avatar ? <img src={user.avatar} alt={user.name} /> : <FaUserCircle />}
                  </div>
                  <div>
                    <p className="dropdown-name">{user?.name} {user?.lastName}</p>
                    <p className="dropdown-email">{user?.email}</p>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <Link to="/dashboard/profile"       className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  <span>👤</span> {t.my_profile}
                </Link>
                <Link to="/dashboard/notifications" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  <span>🔔</span> Notifications
                  {unreadCount > 0 && <span className="dropdown-badge">{unreadCount}</span>}
                </Link>
                <Link to="/dashboard/settings"      className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  <span>⚙️</span> {t.account_settings}
                </Link>
                <div className="dropdown-divider" />
                <button type="button" className="dropdown-item logout"
                  onClick={() => { logoutUser(); setShowDropdown(false); }}>
                  <span>🚪</span> {t.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
