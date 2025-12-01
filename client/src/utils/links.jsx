// src/utils/links.js - CORRECTED
import {
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaUser,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const links = [
  {
    text: "all complaints",
    path: "all-jobs", // ✅ CORRECT: Relative path
    icon: <FaBriefcase />,
    description: "View all submitted complaints",
    requiredRole: "all",
    isEssential: true,
  },
  {
    text: "add complaint",
    path: "add-job", // ✅ CORRECT: Relative path
    icon: <FaFileAlt />,
    description: "Submit a new complaint",
    requiredRole: "all",
    isEssential: true,
  },
  {
    text: "profile",
    path: "profile", // ✅ CORRECT: Relative path
    icon: <FaUser />,
    description: "Manage your profile & personal settings",
    requiredRole: "all",
    isEssential: false,
  },
  {
    text: "stats",
    path: "stats", // ✅ CORRECT: Relative path
    icon: <FaChartBar />,
    description: "View complaint statistics and analytics",
    requiredRole: "all",
    isEssential: false,
  },
  {
    text: "admin",
    path: "admin", // ✅ CORRECT: Relative path
    icon: <FaUsers />,
    description: "Admin panel for system management",
    requiredRole: "admin",
    isEssential: false,
  },
  {
    text: "settings",
    path: "settings", // ✅ CORRECT: Relative path
    icon: <FaCog />,
    description: "Application configuration settings",
    requiredRole: "all",
    isEssential: false,
  },
];

export default links;
