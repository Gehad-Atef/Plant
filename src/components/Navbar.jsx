import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { useUserContext } from "../context/UserProvider";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-green-200 to-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* ✅ Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 dark:text-green-400"
        >
          Plant Store
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
          <Link to="/" className="hover:text-green-500 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-500 transition">
            About Us
          </Link>
          <Link to="/categories" className="hover:text-green-500 transition">
            Categories
          </Link>
          <Link to="/community" className="hover:text-green-500 transition">
            Community
          </Link>
          <Link to="/contact" className="hover:text-green-500 transition">
            Contact Us
          </Link>
        </div>

        {/* ✅ Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            <Search size={20} />
          </motion.button>

          {/* Shopping Cart */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            <ShoppingCart size={20} />
          </motion.button>

          {/* User Profile / Login */}
          {user ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </motion.button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}

          {/* ✅ Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            aria-label="Toggle dark mode"
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

          {/* ✅ Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* ✅ Mobile Menu (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-800 py-4 px-6"
          >
            <Link
              to="/"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600"
            >
              About Us
            </Link>
            <Link
              to="/categories"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600"
            >
              Categories
            </Link>
            <Link
              to="/community"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600"
            >
              Community
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
