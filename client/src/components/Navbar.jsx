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
        <div className="center-dashboard-title">
          <h3 className="dashboard-title">Dashboard</h3>
        </div>

        {/* RIGHT SECTION: User Controls */}
        <div className="nav-right">
          {/* USER PROFILE DROPDOWN */}
          <div className="user-profile-container">
            <div className="user-profile" onClick={toggleDropdown}>
              <div className="user-avatar-wrapper">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="user-avatar-img"
                  />
                ) : (
                  <div className="avatar-fallback">
                    <FaUserCircle className="user-icon" />
                  </div>
                )}
                <div className="status-indicator online"></div>
              </div>

              <div className="user-info">
                <span className="user-name">{user?.name || "User"}</span>
                <span className="user-role">{user?.role || "Member"}</span>
              </div>

              <FaChevronDown
                className={`down-icon ${showDropdown ? "rotate" : ""}`}
              />

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <FaUserCircle />
                      )}
                    </div>
                    <div className="dropdown-user-info">
                      <h4>{user?.name}</h4>
                      <p>{user?.email}</p>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <Link
                    to="/dashboard/profile"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <span className="item-icon">👤</span>
                    <span className="item-text">My Profile</span>
                  </Link>

                  <Link
                    to="/dashboard/settings"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <span className="item-icon">⚙️</span>
                    <span className="item-text">Account Settings</span>
                  </Link>

                  <button
                    type="button"
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <span className="item-icon">🚪</span>
                    <span className="item-text">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
