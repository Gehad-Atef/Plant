// src/pages/Success.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const Success = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 8000); // Redirect after 8 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-lg text-center transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Order Placed Successfully!
        </h1>
        <p className="mb-2">
          Your order has been placed and will be delivered to your address.
        </p>
        <p className="text-sm text-gray-500">
          You’ll be redirected to the homepage shortly.
        </p>
      </div>
    </div>
  );
};

export default Success;
