import { useForgotPassword } from "@/hooks/authService";
import { useState } from "react";
import { Link } from "react-router-dom";

function VerifyEmail() {
  const [email, setEmail] = useState("aya.123.aly.5@gmail.com");
  const { mutate: forgotPassword, isPending } = useForgotPassword(); // Use forgot password mutation

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email); // Call the forgot password function
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
          disabled={isPending} // Disable button while loading
        >
          {isPending ? "Sending..." : "Verify"}
        </button>
      </form>

      {/* Back to Login */}
      <div className="text-center mt-6">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Back to log in?
        </p>
        <Link
          to="/login"
          className="text-green-500 hover:text-green-700 dark:text-green-400 font-medium"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmail;
