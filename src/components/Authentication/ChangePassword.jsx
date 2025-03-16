import { useResetPassword } from "@/hooks/authService";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ChangePassword() {
  const { token } = useParams(); // Extract token from URL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = useResetPassword(); // Use reset password mutation

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword.mutate({ email, token, password, confirmPassword });
  };

  return (
    <div className="text-center">
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
            className="block w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Enter new Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition text-lg font-semibold"
          disabled={resetPassword.isLoading}
        >
          {resetPassword.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="text-center mt-6">
        <a
          href="/login"
          className="text-sm text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-400"
        >
          Back
        </a>
      </div>
    </div>
  );
}

export default ChangePassword;
