import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Loader2, Edit, Lock } from "lucide-react";

import { useTheme } from "../context/ThemeProvider";

import { Dialog } from "./ui/dialog";
import { useProfile } from "@/hooks/authService";

import UpdateProfileDialog from "./UpdateProfileDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";

const ProfileCard = () => {
  const { darkMode } = useTheme();
  const { data: user, isLoading } = useProfile();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);

  const defaultImage =
    "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen pt-24">
        <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 pt-24 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950"
          : "bg-gradient-to-r from-green-200 to-white text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative group w-full max-w-md"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-1000" />

        <div className="relative space-y-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-gray-700">
          {/* Profile Image Section */}
          <div className="relative w-32 h-32 mx-auto">
            <motion.img
              src={user?.imagePath || defaultImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white/50 dark:border-gray-800 shadow-xl hover:border-green-300 dark:hover:border-green-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            />
          </div>

          {/* Username & Name Section */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              <User className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                @{user?.userName}
              </h2>
            </div>
            {(user?.firstName || user?.lastName) && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {user?.firstName} {user?.lastName}
              </p>
            )}
          </motion.div>

          {/* User Info Sections */}
          <div className="space-y-4">
            {/* Email Section */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="py-2 px-4 bg-gradient-to-r from-green-50/50 to-transparent dark:from-gray-800 rounded-xl flex items-center gap-4 border border-green-100/50 dark:border-gray-700"
            >
              <div className="p-3 bg-green-100 dark:bg-gray-800 rounded-lg">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {user?.email || "Not provided"}
                </p>
              </div>
            </motion.div>

            {/* Phone Section */}
            {user?.phoneNumber && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="py-2 px-4 bg-gradient-to-r from-green-50/50 to-transparent dark:from-gray-800 rounded-xl flex items-center gap-4 border border-green-100/50 dark:border-gray-700"
              >
                <div className="p-3 bg-green-100 dark:bg-gray-800 rounded-lg">
                  <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {user.phoneNumber}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUpdateDialog(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-green-500/20 transition-all"
            >
              <Edit className="w-5 h-5" />
              <span className="font-semibold">Edit Profile</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowChangePasswordDialog(true)} // Open change password dialog
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              <Lock className="w-5 h-5" />
              <span className="font-semibold">Change Password</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Update Profile Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        {showUpdateDialog && (
          <UpdateProfileDialog
            user={user}
            open={showUpdateDialog}
            setOpen={setShowUpdateDialog}
          />
        )}
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        open={showChangePasswordDialog}
        onOpenChange={setShowChangePasswordDialog}
      >
        {showChangePasswordDialog && (
          <ChangePasswordDialog setOpen={setShowChangePasswordDialog} />
        )}
      </Dialog>
    </div>
  );
};

export default ProfileCard;
