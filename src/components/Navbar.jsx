// Enhanced Navbar.tsx with AI Prediction Icon
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ShoppingCart, User, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { useUserContext } from "../context/UserProvider";
import { useContext } from "react";
import { SearchContext } from "@/context/SearchProvider";
import { useCart } from "../context/CartProvider";
import PlantAIIcon from "../assets/Icons/plant-svgrepo-com.svg?react";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const { setShowSearch } = useContext(SearchContext);
  const { cartItems } = useCart();
  const cartQuantity = cartItems?.length || 0;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={` dark:from-gray-900 dark:to-gray-600 shadow-md sticky top-0 left-0 w-full z-50 transition-all ${
        isScrolled ? "backdrop-blur-sm bg-opacity-90" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo with hover effect */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/"
            className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center gap-2"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🌿
            </motion.span>
            Plant Store
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
          {["/", "/About", "/Categories", "/Community", "/Product"].map(
            (path, idx) => (
              <Link
                key={idx}
                to={path}
                className="relative px-2 py-1 hover:text-green-500 transition-colors"
              >
                {path.slice(1) || "Home"}
                {location.pathname === path && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"
                    layoutId="underline"
                  />
                )}
              </Link>
            )
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* AI Prediction Icon */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <motion.button
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              onClick={() => navigate("/detect")}
            >
              <PlantAIIcon className="w-6 h-6 text-green-700 dark:text-green-300" />
            </motion.button>
          </motion.div>

          {/* Search */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <motion.button className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
              <Search
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                onClick={() => setShowSearch(true)}
              />
            </motion.button>
          </motion.div>

          {/* Cart */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <motion.button
              className="p-2 relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {cartQuantity > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {cartQuantity}
                </motion.span>
              )}
            </motion.button>
          </motion.div>

          {/* User Section */}
          <motion.div className="flex items-center gap-2">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="relative group"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Profile
                  </span>
                </motion.button>
                <motion.button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform"
                  whileHover={{ scale: 1.05 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </motion.div>
          </motion.button>

          {/* Mobile Menu */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            whileHover={{ scale: 1.1 }}
          >
            {isOpen ? (
              <X size={24} className="text-red-500" />
            ) : (
              <Menu size={24} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
          >
            {["Home", "About", "Categories", "Community", "Contact"].map(
              (item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="block py-4 px-6 text-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
