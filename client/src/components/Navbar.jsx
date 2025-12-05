import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Logo, ThemeToggle } from "./index";
import { useDashboardContext } from "../pages/DashboardLayout";

const Navbar = () => {
  const { toggleSidebar, user, logoutUser } = useDashboardContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logoutUser();
    setShowDropdown(false);
  };

  return (
    <Wrapper>
      <div className="nav-center">
        {/* SIDEBAR TOGGLE BUTTON */}
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        {/* LOGO + TEXT */}
        <div className="logo-section">
          <h4 className="logo-text">dashboard</h4>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="btn-container">
          <ThemeToggle />

          {/* USER PROFILE DROPDOWN */}
          <div className="user-profile" onClick={toggleDropdown}>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="img user-avatar-img"
              />
            ) : (
              <FaUserCircle className="user-icon" />
            )}
            <span className="user-name">{user?.name}</span>
            <FaChevronDown className="down-icon" />
            {showDropdown && (
              <div className="dropdown show-dropdown">
                <Link
                  to="/dashboard/profile"
                  className="dropdown-link"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  className="dropdown-btn"
                  onClick={handleLogout}
                >
                  Logout
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
