import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/component/Sidebar";
import { useTheme } from "../context/ThemeProvider";

export default function AdminLayout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
