import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-700 via-green-400 to-green-100 dark:from-gray-900 dark:via-gray-700 dark:to-gray-800">
      <div className="relative w-full max-w-sm mx-auto overflow-hidden bg-white/40 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-200"
        >
          <FaTimes size={20} />
        </button>

        <div className="px-6 py-6">
          <div className="flex justify-center">
            <img
              className="w-auto h-10"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
          </div>

          <p className="mt-4 mb-6 text-center font-bold text-gray-900 dark:text-gray-200 text-lg">
            Login
          </p>

          <form>
            <div className="w-full">
              <input
                className="block w-full px-4 py-3 mt-2 text-gray-700 dark:text-gray-300 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-400"
              >
                Forget Password?
              </a>

              <button className="px-6 py-2 text-sm font-medium text-white bg-green-700 dark:bg-green-600 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300">
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-white/30 dark:bg-gray-700/70 rounded-b-2xl">
          <span className="text-sm text-gray-800 dark:text-gray-300">
            Don’t have an account?
          </span>

          <a
            href="SignUp"
            className="ml-2 text-sm font-bold text-green-700 dark:text-green-400 hover:underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
