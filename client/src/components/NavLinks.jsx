import React from "react";
import styled from "styled-components";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useSettings } from "../context/SettingsContext";
import { useNotifications } from "../context/NotificationContext";
import { userLinks, adminLinks } from "../utils/links";
import { NavLink } from "react-router-dom";

const COLORS = [
  { bg: "rgba(255,96,0,0.1)",   border: "rgba(255,96,0,0.3)",   icon: "#ff6000" },
  { bg: "rgba(255,154,60,0.1)", border: "rgba(255,154,60,0.3)", icon: "#ff9a3c" },
  { bg: "rgba(255,204,0,0.1)",  border: "rgba(255,204,0,0.3)",  icon: "#ffcc00" },
  { bg: "rgba(106,90,205,0.1)", border: "rgba(106,90,205,0.3)", icon: "#6a5acd" },
  { bg: "rgba(0,191,255,0.1)",  border: "rgba(0,191,255,0.3)",  icon: "#00bfff" },
  { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", icon: "#10b981" },
];

const NavLinks = ({ isBigSidebar }) => {
  const { user, toggleSidebar } = useDashboardContext();
  const { t } = useSettings();
  const { unreadCount } = useNotifications();
  const isAdmin = user?.role === "admin";
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <Wrapper>
      <div className={`role-badge ${isAdmin ? "admin" : "user"}`}>
        {isAdmin ? "⚙️ Admin" : "👤 Citizen"}
      </div>

      {links.map((link, i) => {
        const c = COLORS[i % COLORS.length];
        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            onClick={() => { if (!isBigSidebar) toggleSidebar?.(); }}
            end
          >
            <span className="icon-wrap" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
              {React.cloneElement(link.icon, { style: { color: c.icon } })}
            </span>
            <span className="link-text">{t[link.text] || link.text}</span>
            {link.badge && unreadCount > 0 && (
              <span className="link-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
            )}
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex; flex-direction: column; gap: 0.4rem;

  .role-badge {
    font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1px; padding: 0.3rem 0.75rem; border-radius: 20px;
    margin-bottom: 0.5rem; text-align: center;
    &.admin { background: rgba(255,96,0,0.2); color: #ff9a3c; border: 1px solid rgba(255,96,0,0.4); }
    &.user  { background: rgba(0,191,255,0.15); color: #67e8f9; border: 1px solid rgba(0,191,255,0.3); }
  }

  .nav-link {
    display: flex; align-items: center; gap: 0.85rem; padding: 0.8rem 1rem;
    text-decoration: none; color: rgba(255,255,255,0.82); border-radius: 10px;
    border: 1px solid transparent; transition: all 0.22s ease;

    &:hover {
      background: rgba(255,96,0,0.1); border-color: rgba(255,96,0,0.25);
      transform: translateX(4px); color: white;
      .icon-wrap { transform: scale(1.08); }
    }
    &.active {
      background: linear-gradient(90deg, rgba(255,96,0,0.2), rgba(255,154,60,0.1));
      border-left: 3px solid #ff6000; color: white;
    }
  }

  .icon-wrap {
    width: 34px; height: 34px; border-radius: 8px; display: flex;
    align-items: center; justify-content: center; font-size: 1rem;
    transition: transform 0.22s ease; flex-shrink: 0;
  }

  .link-text { font-size: 0.88rem; font-weight: 500; flex: 1; }

  .link-badge {
    background: #ef4444; color: white; font-size: 0.65rem; font-weight: 800;
    padding: 0.1rem 0.4rem; border-radius: 10px; min-width: 18px; text-align: center;
  }
`;

export default NavLinks;
