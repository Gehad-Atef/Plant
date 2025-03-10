import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";

import { useTheme } from "../context/ThemeProvider";
import { useProfile } from "@/hooks/authService";
import { useUserContext } from "@/context/UserProvider";

const ProfileCard = () => {
  const { darkMode } = useTheme();
  const { data: user, isLoading } = useProfile();
  const { logout } = useUserContext();

  const [image, setImage] = useState(
    user?.imagePath ||
      "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        ></motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-green-200 to-white text-gray-900"
      }`}
    >
      {/* ✅ Profile Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center flex-grow"
      >
        <div
          className={`shadow-lg rounded-xl p-10 w-[500px] text-center transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {/* ✅ Profile Image Section */}
          <div className="relative w-32 h-32 mx-auto">
            <motion.img
              src={image}
              alt="Profile"
              className="w-full h-full rounded-full shadow-md object-cover border-2 transition-all duration-300 hover:scale-105"
            />

            {/* 🎥 Image Upload Icon */}
            <motion.label
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full cursor-pointer hover:bg-green-500 transition-all"
            >
              <FaCamera />
              <input type="file" accept="image/*" className="hidden" />
            </motion.label>
          </div>

          {/* ✅ User Info */}
          <div className="mt-6 space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-3"
            >
              <FaUser className="text-green-500" />
              <p className="font-medium">{user?.userName || "Username"}</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-3"
            >
              <FaEnvelope className="text-green-500" />
              <p className="font-medium">{user?.email || "Email"}</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-3"
            >
              <FaUser className="text-green-500" />
              <p className="font-medium">
                {user?.firstName || "First Name"}{" "}
                {user?.lastName || "Last Name"}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-3"
            >
              <FaPhone className="text-green-500" />
              <p className="font-medium">
                {user?.phoneNumber || "Phone Number"}
              </p>
            </motion.div>
          </div>

          {/* ✅ Buttons Section */}
          <div className="mt-8 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition"
            >
              Edit Profile
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
