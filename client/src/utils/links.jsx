import {
  FaBriefcase, FaFileAlt, FaUser, FaUsers, FaChartBar, FaCog, FaTachometerAlt, FaBell,
} from "react-icons/fa";

export const userLinks = [
  { text: "nav_add_complaint",  path: "add-job",       icon: <FaFileAlt /> },
  { text: "nav_all_complaints", path: "all-jobs",      icon: <FaBriefcase /> },
  { text: "nav_notifications",  path: "notifications", icon: <FaBell />, badge: true },
  { text: "nav_stats",          path: "stats",         icon: <FaChartBar /> },
  { text: "nav_profile",        path: "profile",       icon: <FaUser /> },
  { text: "nav_settings",       path: "settings",      icon: <FaCog /> },
];

export const adminLinks = [
  { text: "nav_dashboard",      path: "stats",         icon: <FaTachometerAlt /> },
  { text: "nav_all_complaints", path: "all-jobs",      icon: <FaBriefcase /> },
  { text: "nav_notifications",  path: "notifications", icon: <FaBell />, badge: true },
  { text: "nav_admin",          path: "admin",         icon: <FaUsers /> },
  { text: "nav_profile",        path: "profile",       icon: <FaUser /> },
  { text: "nav_settings",       path: "settings",      icon: <FaCog /> },
];

const links = [...userLinks];
export default links;
