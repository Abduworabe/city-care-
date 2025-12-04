import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo } from "./index";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaCrown, FaChartLine, FaBell } from "react-icons/fa";

const BigSidebar = () => {
  const { user } = useDashboardContext();

  return (
    <Wrapper>
      <div className="sidebar-container">
        {/* Decorative Elements */}

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
              <div className="notification-bell">
                <FaBell />
                <span className="notification-count">3</span>
              </div>
            </div>
            <NavLinks isBigSidebar={true} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
