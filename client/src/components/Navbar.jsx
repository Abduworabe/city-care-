import React, { useState, useRef, useEffect } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import {
  FaAlignLeft, FaUserCircle, FaChevronDown, FaCog, FaMoon, FaSun,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useSettings } from "../context/SettingsContext";

const Navbar = () => {
  const { toggleSidebar, user, logoutUser, toggleDarkTheme, isDarkTheme } =
    useDashboardContext();
  const { t } = useSettings();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper>
      <div className="nav-center">

        {/* LEFT: Hamburger (mobile only) */}
        <div className="nav-left">
          <button
            type="button"
            className="hamburger-btn"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <FaAlignLeft />
          </button>
        </div>

        {/* RIGHT: Controls */}
        <div className="nav-right">

          {/* Theme Toggle */}
          <button
            type="button"
            className="icon-btn"
            onClick={toggleDarkTheme}
            aria-label="Toggle theme"
            title={isDarkTheme ? "Switch to Light" : "Switch to Dark"}
          >
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </button>

          {/* Settings */}
          <Link to="/dashboard/settings" className="icon-btn" title="Settings">
            <FaCog />
          </Link>

          {/* User Profile Dropdown */}
          <div className="profile-container" ref={dropdownRef}>
            <button
              type="button"
              className="profile-btn"
              onClick={() => setShowDropdown((prev) => !prev)}
              aria-label="User menu"
              aria-expanded={showDropdown}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="profile-img"
                />
              ) : (
                <FaUserCircle className="profile-icon" />
              )}
              <span className="profile-name">{user?.name}</span>
              <FaChevronDown className={`chevron ${showDropdown ? "open" : ""}`} />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="dropdown">
                {/* Header */}
                <div className="dropdown-head">
                  <div className="dropdown-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <FaUserCircle />
                    )}
                  </div>
                  <div>
                    <p className="dropdown-name">{user?.name}</p>
                    <p className="dropdown-email">{user?.email}</p>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <Link
                  to="/dashboard/profile"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  <span>👤</span> {t.my_profile}
                </Link>

                <Link
                  to="/dashboard/settings"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  <span>⚙️</span> {t.account_settings}
                </Link>

                <div className="dropdown-divider" />

                <button
                  type="button"
                  className="dropdown-item logout"
                  onClick={() => { logoutUser(); setShowDropdown(false); }}
                >
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
