import { Outlet, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        {/* Outlet for Login/Signup */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
