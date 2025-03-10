import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Upload, Loader2 } from "lucide-react";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/Dialog";
import { useUpdateProfile } from "@/hooks/authService";

const UpdateProfileDialog = ({ user, open, setOpen }) => {
  const { mutate: updateProfile, isLoading } = useUpdateProfile();
  const defaultImage =
    "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png";

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    imagePath: null,
  });

  const [preview, setPreview] = useState(user?.imagePath || defaultImage);

  useEffect(() => {
    if (open) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phoneNumber: user?.phoneNumber || "",
        imagePath: null,
      });
      setPreview(user?.imagePath || defaultImage);
    }
  }, [open, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagePath: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    updateProfile(form, {
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
          Edit Profile
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
          Update your personal details and profile picture
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative group">
              <img
                src={preview}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white/50 dark:border-gray-800 shadow-xl object-cover"
              />
              <label className="absolute bottom-0 right-0 p-2 bg-green-500 rounded-full shadow-lg border-2 border-white dark:border-gray-900 cursor-pointer hover:bg-green-400 transition-colors">
                <Upload className="w-5 h-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div className="space-y-4">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="relative"
            >
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full pl-12 pr-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-gray-300"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full pl-12 pr-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-gray-300"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-gray-300"
              />
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gray-500/20 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-600/20 transition-all"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-green-500/20 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </DialogContent>
  );
};

export default UpdateProfileDialog;
