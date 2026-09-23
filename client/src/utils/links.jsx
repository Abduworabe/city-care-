import {
  FaBriefcase,
  FaFileAlt,
  FaUser,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const links = [
  { text: "nav_all_complaints", path: "all-jobs",  icon: <FaBriefcase /> },
  { text: "nav_add_complaint",  path: "add-job",   icon: <FaFileAlt /> },
  { text: "nav_profile",        path: "profile",   icon: <FaUser /> },
  { text: "nav_stats",          path: "stats",     icon: <FaChartBar /> },
  { text: "nav_admin",          path: "admin",     icon: <FaUsers />, adminOnly: true },
  { text: "nav_settings",       path: "settings",  icon: <FaCog /> },
];

export default links;
