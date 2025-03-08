import { useState } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { useRegister } from "../../hooks/authService";

const SignUp = () => {
  const { mutate: register, isLoading, error } = useRegister();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match!");
    register({
      UserName: formData.username,
      Email: formData.email,
      Password: formData.password,
    });
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">
        Create Account
      </h2>
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error.response?.data?.message || "Registration failed!"}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Username */}
        <div className="relative">
          <User
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-300"
            required
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-300"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-300"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-300"
            required
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
        >
          {isLoading ? (
            <Loader2 className="animate-spin mx-auto" size={20} />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      {/* Redirect to Login */}
      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-green-700 dark:text-green-400 font-bold hover:underline"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default SignUp;
