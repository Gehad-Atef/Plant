import { useForgotPassword } from "@/hooks/authService";
import { useState } from "react";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const forgotPassword = useForgotPassword(); // Use forgot password mutation

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword.mutate(email); // Call the forgot password function
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
        Verify Email
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition text-lg font-semibold"
          disabled={forgotPassword.isLoading} // Disable button while loading
        >
          {forgotPassword.isLoading ? "Sending..." : "Verify"}
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

export default VerifyEmail;
