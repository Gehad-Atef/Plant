import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaPlus } from "react-icons/fa";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeProvider";
function ProfileCard() {
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );

  const { darkMode } = useTheme();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-green-200 to-white text-gray-900"
      }`}
    >
      {/* ✅ Navbar added */}
      <Navbar />

      <div className="flex items-center justify-center flex-grow">
        <div
          className={`shadow-lg rounded-xl p-12 w-[550px] h-[550px] mt-20 transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {/* Profile Image Section */}
          <div className="flex justify-center relative">
            <div className="relative w-32 h-32">
              <img
                src={image}
                alt="Profile"
                className="w-full h-full rounded-full shadow-md object-cover border-2 transition ${
                  darkMode ? 'border-gray-600' : 'border-gray-300'
                }"
              />

              {/* Upload Button */}
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white text-sm flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition">
                <FaPlus />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <p className="font-bold flex items-center">
                <FaUser className="mr-2" /> First Name
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Amelia
              </p>
            </div>
            <div>
              <p className="font-bold flex items-center">
                <FaUser className="mr-2" /> Last Name
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Noah
              </p>
            </div>
            <div>
              <p className="font-bold flex items-center">
                <FaUser className="mr-2" /> User Name
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                amelia_no89
              </p>
            </div>
            <div>
              <p className="font-bold flex items-center">
                <FaPhone className="mr-2" /> Phone no.
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                +98 1245560090
              </p>
            </div>
            <div className="col-span-2">
              <p className="font-bold flex items-center">
                <FaEnvelope className="mr-2" /> E-Mail
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                AmeliaNoah@random.com
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8 flex justify-center">
            <button
              className={`px-8 py-3 rounded-lg shadow-md transition text-lg font-semibold ${
                darkMode
                  ? "bg-green-500 hover:bg-green-400 text-white"
                  : "bg-green-600 hover:bg-green-500 text-white"
              }`}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
