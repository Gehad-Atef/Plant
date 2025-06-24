import { Link, useLocation } from "react-router-dom";
import {
    FaTachometerAlt,
    FaShoppingCart,
    FaUsers,
    FaSignOutAlt,
    FaHome,
    FaClipboardList,
} from "react-icons/fa";
import { useTheme } from "../../../context/ThemeProvider";
import { useUserContext } from "../../../context/UserProvider"; // ✅ ضيفي الاستيراد ده
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const { pathname } = useLocation();
    const { darkMode } = useTheme();
    // const { logout } = useUserContext(); // ✅ استخدمي logout من الكونتكست
    const navigate = useNavigate();
    const { logout } = useUserContext();

    const handleLogout = () => {
        logout(); // يمسح بيانات المستخدم من السياق
        navigate("/"); // يرجع للـ Home
    };

    const isActive = (path) =>
        pathname === path
            ? "text-green-600 font-semibold dark:text-green-400"
            : "hover:text-green-600 dark:hover:text-green-400";

    return (
        <aside
            className={`w-64 border-r p-4 min-h-screen transition-colors duration-300 ${
                darkMode
                    ? "bg-gray-900 border-gray-700 text-gray-200"
                    : "bg-green-100 border-green-200 text-gray-800"
            }`}
        >
            <div className="text-2xl font-bold flex items-center gap-2 mt-6 ml-2">
                <span>🌿</span> Admin Panel
            </div>

            <ul className="space-y-4 mt-20 pl-4">
                <li>
                    <Link
                        to="/"
                        className={`flex items-center gap-2 ${isActive("/")}`}
                    >
                        <FaHome /> Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-2 ${isActive(
                            "/dashboard"
                        )}`}
                    >
                        <FaTachometerAlt /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/products"
                        className={`flex items-center gap-2 ${isActive(
                            "/dashboard/products"
                        )}`}
                    >
                        <FaShoppingCart /> Products
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/categories"
                        className={`flex items-center gap-2 ${isActive(
                            "/dashboard/categories"
                        )}`}
                    >
                        <FaClipboardList /> Categories
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/customers"
                        className={`flex items-center gap-2 ${isActive(
                            "/dashboard/customers"
                        )}`}
                    >
                        <FaUsers /> Customers
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/orders"
                        className={`flex items-center gap-2 ${isActive(
                            "/dashboard/orders"
                        )}`}
                    >
                        <FaClipboardList /> Orders
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 hover:text-red-500 dark:hover:text-red-400"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            </ul>
        </aside>
    );
}
