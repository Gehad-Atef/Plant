// Enhanced Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useNotificationQuery from "../hooks/useNotificationQuery";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import {
    Menu,
    X,
    ShoppingCart,
    User,
    Search,
    Sun,
    Moon,
    Settings2,
    Bell,
    LogOut,
} from "lucide-react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { useTheme } from "../context/ThemeProvider";
import { useUserContext } from "../context/UserProvider";
import { useContext } from "react";
import { SearchContext } from "@/context/SearchProvider";
import { useCart } from "../context/CartProvider";
import PlantAIIcon from "../assets/Icons/plant-svgrepo-com.svg?react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useProfile } from "@/hooks/authService";

const navRoutes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/categories", name: "Categories" },
    { path: "/community", name: "Community" },
    { path: "/product", name: "Product" },
];

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    // const { isAuthenticated, logout } = useUserContext();
    const { user, isAuthenticated, logout } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { scrollY } = useScroll();
    const { setShowSearch } = useContext(SearchContext);
    const { cartItems, clearCartItems } = useCart();
    const cartQuantity = cartItems?.length || 0;
    //const { data: user } = useProfile();

    const { notifications, isLoading, isError } = useNotificationQuery();
    const notificationCount = notifications?.length || 0;
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);
    const handleLogout = () => {
        logout();
        clearCartItems();
        navigate("/");
    };
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`sticky top-0 left-0 w-full z-50 ${
                isScrolled
                    ? "backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-md"
                    : "bg-white dark:bg-gray-900"
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <Link
                            to="/"
                            className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center gap-2"
                            aria-label="Plant Store Home"
                        >
                            <motion.span
                                animate={{ rotate: [0, 20, -20, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                aria-hidden="true"
                            >
                                🌿
                            </motion.span>
                            Plant Store
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex space-x-6">
                            {navRoutes.map((route) => (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    className={`relative px-2 py-1 ${
                                        location.pathname === route.path
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-gray-600 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                                    } transition-colors`}
                                >
                                    {route.name}
                                    {location.pathname === route.path && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"
                                            layoutId="underline"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-4 ml-4">
                            <IconButton
                                icon={<Search className="w-5 h-5" />}
                                onClick={() => setShowSearch(true)}
                                label="Open search"
                            />

                            <IconButton
                                icon={<PlantAIIcon className="w-6 h-6" />}
                                onClick={() => navigate("/detect")}
                                label="AI Plant Detection"
                            />
                            {isAuthenticated && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                                            aria-label="Notifications"
                                        >
                                            <Bell className="w-5 h-5" />

                                            {notificationCount > 0 && (
                                                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                                                    {notificationCount}
                                                </span>
                                            )}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64">
                                        {isLoading && (
                                            <div className="text-sm text-gray-500">
                                                Loading...
                                            </div>
                                        )}
                                        {isError && (
                                            <div className="text-sm text-red-500">
                                                Failed to load notifications
                                            </div>
                                        )}
                                        {!isLoading &&
                                            notifications?.items?.length ===
                                                0 && (
                                                <div className="text-sm text-gray-500">
                                                    No notifications yet.
                                                </div>
                                            )}
                                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                                            {notifications?.items?.map(
                                                (notif) => (
                                                    <li
                                                        key={notif.id}
                                                        className="text-sm bg-muted rounded p-2"
                                                    >
                                                        <p>
                                                            {notif.message ||
                                                                "No message"}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {new Date(
                                                                notif.createdAt
                                                            ).toLocaleString()}
                                                        </p>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </PopoverContent>
                                </Popover>
                            )}

                            <CartButton
                                quantity={cartQuantity}
                                onClick={() => navigate("/cart")}
                            />

                            <ThemeToggle
                                darkMode={darkMode}
                                toggle={toggleDarkMode}
                            />

                            <UserSection
                                isAuthenticated={isAuthenticated}
                                user={user}
                                onLogout={handleLogout}
                                navigate={navigate}
                            />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-red-500" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="md:hidden fixed top-20 inset-x-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50"
                        >
                            <div className="p-4">
                                {navRoutes.map((route) => (
                                    <Link
                                        key={route.path}
                                        to={route.path}
                                        className={`block py-3 px-4 rounded-lg ${
                                            location.pathname === route.path
                                                ? "bg-green-100 dark:bg-gray-700 text-green-600 dark:text-green-400"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        {route.name}
                                    </Link>
                                ))}

                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-around">
                                        <IconButton
                                            icon={
                                                <Search className="w-5 h-5" />
                                            }
                                            onClick={() => setShowSearch(true)}
                                            label="Search"
                                        />
                                        <IconButton
                                            icon={
                                                <PlantAIIcon className="w-6 h-6" />
                                            }
                                            onClick={() => navigate("/detect")}
                                            label="AI Detection"
                                        />
                                        <CartButton
                                            quantity={cartQuantity}
                                            onClick={() => navigate("/cart")}
                                        />
                                        <ThemeToggle
                                            darkMode={darkMode}
                                            toggle={toggleDarkMode}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

// Sub-components for better organization

const IconButton = ({ icon, onClick, label }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
        onClick={onClick}
        aria-label={label}
    >
        {icon}
    </motion.button>
);

const CartButton = ({ quantity, onClick }) => (
    <motion.div whileHover={{ scale: 1.05 }} className="relative">
        <motion.button
            className="p-2 relative"
            onClick={onClick}
            aria-label="View shopping cart"
        >
            <ShoppingCart className="w-5 h-5" />
            {quantity > 0 && (
                <motion.span
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                >
                    {quantity}
                </motion.span>
            )}
        </motion.button>
    </motion.div>
);

const ThemeToggle = ({ darkMode, toggle }) => (
    <motion.button
        onClick={toggle}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
    >
        <motion.div
            animate={{ rotate: darkMode ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {darkMode ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </motion.div>
    </motion.button>
);

const UserSection = ({ isAuthenticated, user, onLogout, navigate }) => {
    const isAdmin = user?.role === "Admin";

    return (
        <div className="flex items-center gap-2">
            {isAuthenticated ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <Avatar className="border-2 border-green-300 h-9 w-9">
                            <AvatarImage
                                src={user?.imagePath}
                                className="object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                            <AvatarFallback className="bg-gray-100 dark:bg-gray-700">
                                {user?.userName?.[0] || (
                                    <User className="w-4 h-4" />
                                )}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        <div className="px-2 py-1.5 text-sm font-medium truncate">
                            {user?.userName || "User Account"}
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() =>
                                navigate(isAdmin ? "/dashboard" : "/profile")
                            }
                            className="cursor-pointer"
                        >
                            <Settings2 className="w-4 h-4 mr-2" />
                            {isAdmin ? "Dashboard" : "Profile"}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={onLogout}
                            className="text-red-600 cursor-pointer dark:text-red-400"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        aria-label="Login or Register"
                    >
                        Login
                    </Link>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
