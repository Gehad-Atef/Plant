import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Verification email sent to: ${email}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-700 via-green-400 to-green-100 dark:from-gray-900 dark:via-gray-700 dark:to-gray-800">
      <div className="relative w-full max-w-sm mx-auto bg-white/30 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl p-8">
        {/* Close (X) Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-200"
        >
          <FaTimes size={20} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            className="w-auto h-10"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              New Password
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
              type="password"
              placeholder=" Enter new Password"
              aria-label="Password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Confirm New Password
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition text-lg font-semibold"
          >
            Submit
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="login"
            className="text-sm text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-400"
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
