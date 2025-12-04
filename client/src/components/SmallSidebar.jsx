import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes, FaUserCircle, FaBolt } from "react-icons/fa";
import { Logo } from "./index";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar, user } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        <div className="content">
          {/* Header */}
          <div className="sidebar-header">
            <div className="user-quick-info">
              <div className="user-avatar-small">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="avatar-img-small"
                  />
                ) : (
                  <FaUserCircle className="avatar-icon-small" />
                )}
              </div>
              <div className="user-details">
                <h4 className="user-greeting">Welcome back!</h4>
                <p className="user-name-small">{user?.name || "User"}</p>
              </div>
            </div>
            <button type="button" className="close-btn" onClick={toggleSidebar}>
              <FaTimes />
            </button>
          </div>

          {/* Logo */}
          <div className="logo-section-small">
            <Logo />
            <div className="logo-text-small">
              <span className="logo-main">Dashboard</span>
              <span className="logo-sub">Mobile</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="nav-section">
            <div className="nav-header">
              <FaBolt className="bolt-icon" />
              <h3 className="nav-title">Quick Menu</h3>
            </div>
            <NavLinks toggleSidebar={toggleSidebar} />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="action-btn primary">
              <span>New Project</span>
            </button>
            <button className="action-btn secondary">
              <span>Quick Report</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mobile-footer">
            <div className="connection-status">
              <div className="status-dot connected"></div>
              <span>Connected</span>
            </div>
            <div className="version-info">
              <span>v2.5.1</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
