import React from "react";
import styled from "styled-components";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useSettings } from "../context/SettingsContext";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const COLORS = [
  { bg: "rgba(255,96,0,0.1)",   border: "rgba(255,96,0,0.3)",   icon: "#ff6000",  hover: "rgba(255,96,0,0.2)" },
  { bg: "rgba(255,154,60,0.1)", border: "rgba(255,154,60,0.3)", icon: "#ff9a3c",  hover: "rgba(255,154,60,0.2)" },
  { bg: "rgba(255,204,0,0.1)",  border: "rgba(255,204,0,0.3)",  icon: "#ffcc00",  hover: "rgba(255,204,0,0.2)" },
  { bg: "rgba(106,90,205,0.1)", border: "rgba(106,90,205,0.3)", icon: "#6a5acd",  hover: "rgba(106,90,205,0.2)" },
  { bg: "rgba(138,43,226,0.1)", border: "rgba(138,43,226,0.3)", icon: "#8a2be2",  hover: "rgba(138,43,226,0.2)" },
  { bg: "rgba(0,191,255,0.1)",  border: "rgba(0,191,255,0.3)",  icon: "#00bfff",  hover: "rgba(0,191,255,0.2)" },
];

const NavLinks = ({ isBigSidebar }) => {
  const { user, toggleSidebar } = useDashboardContext();
  const { t } = useSettings();

  return (
    <Wrapper>
      {links.map((link, i) => {
        if (link.adminOnly && user?.role !== "admin") return null;
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
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex; flex-direction: column; gap: 0.5rem;

  .nav-link {
    display: flex; align-items: center; gap: 0.9rem; padding: 0.85rem 1rem;
    text-decoration: none; color: rgba(255,255,255,0.85); border-radius: 10px;
    border: 1px solid transparent; transition: all 0.25s ease; position: relative; overflow: hidden;

    &:hover {
      background: rgba(255,96,0,0.12); border-color: rgba(255,96,0,0.3);
      transform: translateX(5px); color: white;
      .icon-wrap { transform: scale(1.08) rotate(4deg); }
    }

    &.active {
      background: linear-gradient(90deg, rgba(255,96,0,0.18), rgba(255,154,60,0.1));
      border-left: 3px solid #ff6000; color: white;
      .icon-wrap { box-shadow: 0 0 14px rgba(255,96,0,0.3); }
    }
  }

  .icon-wrap {
    width: 36px; height: 36px; border-radius: 9px; display: flex;
    align-items: center; justify-content: center; font-size: 1.05rem;
    transition: all 0.25s ease; flex-shrink: 0;
  }

  .link-text { font-size: 0.9rem; font-weight: 500; flex: 1; }
`;

export default NavLinks;
