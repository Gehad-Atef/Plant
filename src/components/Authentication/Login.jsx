import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useLogin } from "../../hooks/authService";
import { Link } from "react-router-dom";

const Login = () => {
  const { mutate: login, isLoading, error } = useLogin(); // Login mutation hook
  const [email, setEmail] = useState("aya.123.aly.5@gmail.com");
  const [password, setPassword] = useState("Aya512!!");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="text-center">
      {/* Logo */}
      <div className="flex justify-center">
        <img
          className="w-auto h-10"
          src="https://merakiui.com/images/logo.svg"
          alt="Logo"
        />
      </div>

      <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-200">
        Login
      </h2>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">
          {error.response?.data?.message || "Login failed!"}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Email Input */}
        <div className="relative">
          <Mail
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-300"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-300"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/email"
            className="text-sm text-green-700 dark:text-green-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
        >
          {isLoading ? (
            <Loader2 className="animate-spin mx-auto" size={20} />
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-green-700 dark:text-green-400 font-bold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
