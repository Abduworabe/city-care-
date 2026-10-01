import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo } from "./index";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useNotifications } from "../context/NotificationContext";
import { FaCrown, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const BigSidebar = () => {
  const { user, showSidebar } = useDashboardContext();
  const { unreadCount } = useNotifications();

  return (
    <Wrapper className={showSidebar ? "collapsed" : ""}>
      <div className="sidebar-container">
        <div className="content">
          {/* Logo and Branding */}
          <header>
            <div className="logo-wrapper">
              <Logo />
            </div>
          </header>

          {/* User Profile Card */}
          <div className="user-card">
            <div className="user-info">
              <div className="user-badges">
                <span className="user-role">{user?.role || "Member"}</span>
                {user?.role === "admin" && (
                  <span className="badge admin-badge">
                    <FaCrown /> Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="navigation-section">
            <div className="section-header">
              <h3 className="section-title">Navigation</h3>
              <Link to="/dashboard/notifications" className="notification-bell" title="Notifications">
                <FaBell />
                {unreadCount > 0 && (
                  <span className="notification-count">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
            </div>
            <NavLinks isBigSidebar={true} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
