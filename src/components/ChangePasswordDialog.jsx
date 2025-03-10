import { useState } from "react";
import { motion } from "framer-motion";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { useChangePassword } from "@/hooks/authService";

const ChangePasswordDialog = ({ setOpen }) => {
  const { mutate: changePassword, isLoading } = useChangePassword();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(formData, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <DialogContent className="rounded-2xl overflow-auto max-h-[90%] bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-white/20 dark:border-gray-700 shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <DialogTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Change Password
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
          Please enter your current password and a new password.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="relative">
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              className="w-full pl-4 pr-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border border-gray-500/50 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-gray-300"
              required
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full pl-4 pr-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border border-gray-500/50 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-gray-300"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-green-500/20"
            >
              {isLoading ? "Changing..." : "Change Password"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </DialogContent>
  );
};

export default ChangePasswordDialog;
