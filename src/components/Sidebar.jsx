import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";

export default function Sidebar() {
  const { pathname } = useLocation();

  const navItem = (to, icon, label) => (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
        pathname === to
          ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-white"
          : "text-gray-700 hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 dark:text-white shadow-lg p-4 space-y-2 fixed">
      <h1 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
        PlantHub
      </h1>
      {navItem("/community", <FaHome />, "News Feed")}
      {navItem("/me-posts", <FaUser />, "My Posts")}
    </aside>
  );
}
