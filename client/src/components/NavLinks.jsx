import React from "react";
import styled from "styled-components";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar, onLinkClick }) => {
  const { user, toggleSidebar } = useDashboardContext();

  // Function to get color for each nav item based on index
  const getNavItemColor = (index) => {
    const colors = [
      {
        bg: "rgba(255, 96, 0, 0.1)",
        border: "rgba(255, 96, 0, 0.3)",
        icon: "#ff6000",
        hoverBg: "rgba(255, 96, 0, 0.2)",
      },
      {
        bg: "rgba(255, 154, 60, 0.1)",
        border: "rgba(255, 154, 60, 0.3)",
        icon: "#ff9a3c",
        hoverBg: "rgba(255, 154, 60, 0.2)",
      },
      {
        bg: "rgba(255, 204, 0, 0.1)",
        border: "rgba(255, 204, 0, 0.3)",
        icon: "#ffcc00",
        hoverBg: "rgba(255, 204, 0, 0.2)",
      },
      {
        bg: "rgba(106, 90, 205, 0.1)",
        border: "rgba(106, 90, 205, 0.3)",
        icon: "#6a5acd",
        hoverBg: "rgba(106, 90, 205, 0.2)",
      },
      {
        bg: "rgba(138, 43, 226, 0.1)",
        border: "rgba(138, 43, 226, 0.3)",
        icon: "#8a2be2",
        hoverBg: "rgba(138, 43, 226, 0.2)",
      },
      {
        bg: "rgba(0, 191, 255, 0.1)",
        border: "rgba(0, 191, 255, 0.3)",
        icon: "#00bfff",
        hoverBg: "rgba(0, 191, 255, 0.2)",
      },
    ];
    return colors[index % colors.length];
  };

  return (
    <NavLinksWrapper>
      <div className="nav-links">
        {links.map((link, index) => {
          const { text, path, icon } = link;
          const color = getNavItemColor(index);

          // hide admin for non-admin users
          if (user.role !== "admin" && path === "admin") return null;

          return (
            <NavLink
              to={path}
              key={text}
              onClick={() => {
                if (!isBigSidebar) toggleSidebar?.();
                onLinkClick?.();
              }}
              className="nav-link"
              style={({ isActive }) => ({
                "--nav-bg": isActive ? color.bg : "transparent",
                "--nav-border": isActive ? color.border : "transparent",
                "--nav-hover": color.hoverBg,
                "--nav-icon": isActive
                  ? color.icon
                  : "rgba(255, 255, 255, 0.7)",
              })}
              end
            >
              <span
                className="icon-wrapper"
                style={{
                  background: color.bg,
                  border: `1px solid ${color.border}`,
                }}
              >
                {React.cloneElement(icon, {
                  style: { color: color.icon, transition: "color 0.3s ease" },
                })}
              </span>
              <span className="link-text">{text}</span>
              <span className="link-badge">
                {index === 0 && "3"}
                {index === 2 && "New"}
              </span>
            </NavLink>
          );
        })}
      </div>
    </NavLinksWrapper>
  );
};

const NavLinksWrapper = styled.div`
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    background: var(--nav-bg, transparent);
    border: 1px solid var(--nav-border, transparent);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: linear-gradient(to bottom, #ff6000, #ffcc00);
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      background: var(--nav-hover, rgba(255, 96, 0, 0.1));
      border-color: rgba(255, 96, 0, 0.3);
      transform: translateX(8px);
      color: white;

      &::before {
        transform: scaleY(1);
      }

      .icon-wrapper {
        transform: scale(1.1) rotate(5deg);
        background: rgba(255, 96, 0, 0.2);
        box-shadow: 0 4px 15px rgba(255, 96, 0, 0.2);
      }

      .link-text {
        transform: translateX(5px);
      }
    }

    &.active {
      background: linear-gradient(
        90deg,
        rgba(255, 96, 0, 0.15),
        rgba(255, 154, 60, 0.1)
      );
      border-left: 4px solid #ff6000;
      box-shadow: 0 4px 20px rgba(255, 96, 0, 0.15);
      color: white;

      &::before {
        transform: scaleY(1);
      }

      .icon-wrapper {
        background: rgba(255, 96, 0, 0.2);
        border-color: #ff6000;
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(255, 96, 0, 0.3);
      }
    }
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    color: var(--nav-icon);
    position: relative;
    z-index: 1;

    svg {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }
  }

  .link-text {
    flex: 1;
    font-size: 0.95rem;
    font-weight: 500;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .link-badge {
    background: linear-gradient(135deg, #ff3860, #ff6000);
    color: white;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    animation: pulse 2s infinite;
    box-shadow: 0 2px 10px rgba(255, 56, 96, 0.3);

    &:empty {
      display: none;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      box-shadow: 0 2px 10px rgba(255, 56, 96, 0.3);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(255, 56, 96, 0.4);
    }
  }

  /* Optional: Add a subtle ripple effect on click */
  .nav-link:active::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.4);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  .nav-link:active::after {
    animation: ripple 1s ease-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(20, 20);
      opacity: 0;
    }
  }
`;

export default NavLinks;
