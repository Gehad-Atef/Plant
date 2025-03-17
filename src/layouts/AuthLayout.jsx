import { Outlet, useNavigate } from "react-router-dom";
import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { motion } from "framer-motion";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
        {/* Close Button */}
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-500 transition"
        >
          <X size={22} />
        </motion.button>

        {/* ✅ Dark Mode Toggle */}
        {/* <motion.button
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
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
        </motion.button> */}

        {/* Outlet for Login/Signup */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
