import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { Logo } from "./index";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar, user } = useDashboardContext();

  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        {/* Overlay — click to close */}
        <div className="sidebar-overlay" onClick={toggleSidebar} />

        {/* Sidebar Panel */}
        <div className="content">
          {/* Header */}
          <div className="sidebar-header">
            <div className="user-quick-info">
              <div className="user-avatar-small">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="avatar-img-small" />
                ) : (
                  <FaUserCircle className="avatar-icon-small" />
                )}
              </div>
              <div className="user-details">
                <p className="user-greeting">Welcome back!</p>
                <p className="user-name-small">{user?.name || "User"}</p>
              </div>
            </div>
            <button
              type="button"
              className="close-btn"
              onClick={toggleSidebar}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          {/* Logo */}
          <div className="logo-section-small">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav className="nav-section">
            <p className="nav-title">Navigation</p>
            <NavLinks isBigSidebar={false} />
          </nav>

          {/* Footer */}
          <div className="mobile-footer">
            <div className="connection-status">
              <div className="status-dot connected" />
              <span>Connected</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
