import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import {
  FaAlignLeft,
  FaUserCircle,
  FaChevronDown,
  FaBell,
  FaSearch,
  FaCog,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Logo, ThemeToggle } from "./index";
import { useDashboardContext } from "../pages/DashboardLayout";

const Navbar = () => {
  const { toggleSidebar, user, logoutUser } = useDashboardContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logoutUser();
    setShowDropdown(false);
  };

  return (
    <Wrapper>
      <div className="nav-center">
        {/* LEFT SECTION: Sidebar toggle + Logo */}
        <div className="nav-left">
          <button
            type="button"
            className="toggle-btn hamburger-only"
            onClick={toggleSidebar}
          >
            <FaAlignLeft />
            <div className="toggle-glow"></div>
          </button>
        </div>

        {/* RIGHT SECTION: User Controls */}
        <div className="nav-right">
          {/* Theme Toggle */}

          {/* Settings Button */}
          <Link to="/dashboard/settings" className="settings-btn">
            <FaCog />
          </Link>

          {/* Notifications */}
          <div className="notifications-container">
            <button className="notifications-btn" onClick={toggleNotifications}>
              <FaBell />
              <span className="notification-badge">3</span>
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <span className="clear-all">Clear All</span>
                </div>
                <div className="notifications-list">
                  <div className="notification-item new">
                    <div className="notification-icon">
                      <div className="icon-bg success">!</div>
                    </div>
                    <div className="notification-content">
                      <p className="notification-text">
                        System update completed successfully
                      </p>
                      <span className="notification-time">2 min ago</span>
                    </div>
                  </div>
                  <div className="notification-item new">
                    <div className="notification-icon">
                      <div className="icon-bg warning">!</div>
                    </div>
                    <div className="notification-content">
                      <p className="notification-text">
                        New user registration requires approval
                      </p>
                      <span className="notification-time">15 min ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-icon">
                      <div className="icon-bg info">!</div>
                    </div>
                    <div className="notification-content">
                      <p className="notification-text">
                        Monthly report is ready for review
                      </p>
                      <span className="notification-time">1 hour ago</span>
                    </div>
                  </div>
                </div>
                <div className="notifications-footer">
                  <Link to="/dashboard/notifications">
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="user-profile-container">
            <button className="user-btn" onClick={toggleDropdown}>
              <div className="user-avatar">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="avatar-img"
                  />
                ) : (
                  <FaUserCircle className="avatar-fallback" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
