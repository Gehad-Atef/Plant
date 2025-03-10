import { useState } from "react";
import { useTheme } from "../context/ThemeProvider"; // ✅ استيراد useTheme
import ContactImage from "../assets/Images/contact.jpg";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const { darkMode } = useTheme(); // ✅ استخدام حالة الـ Dark Mode

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-green-200 to-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-center flex-grow py-16 px-6 md:px-20">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-7xl shadow-lg rounded-2xl p-14 transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {/* ✅ Left Section - Text Content */}
          <div className="flex flex-col justify-center space-y-5">
            <h1 className="text-green-700 font-semibold text-lg">CONTACT US</h1>
            <h4 className="text-3xl font-bold">Everything Planters</h4>
            <p
              className={`leading-relaxed text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              We are your online destination. We offer a wide range of various
              plants and instructions shipped directly from our (green) house to
              yours!
            </p>

            <h4 className="text-xl font-semibold">Get the scoop</h4>
            <p className="text-green-600 font-medium">
              Subscribe to our newsletter.
            </p>

            {/* ✅ Newsletter Form */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                className={`p-4 border rounded-lg w-full focus:ring-2 focus:ring-green-500 text-lg transition ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300"
                }`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition font-semibold">
                Sign Up
              </button>
            </div>
          </div>

          {/* ✅ Right Section - Image */}
          <div className="flex justify-center">
            <img
              src={ContactImage}
              alt="Planter with seedlings"
              className="rounded-xl shadow-lg w-[300px] h-[420px] object-cover transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
