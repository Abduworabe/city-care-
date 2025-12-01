import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar, onLinkClick }) => {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;

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
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
