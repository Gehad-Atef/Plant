import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SignUp = () => {
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
          <form className="w-full max-w-md">
            {/* اللوجو */}
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8 mt-4"
                src="https://merakiui.com/images/logo.svg"
                alt="Logo"
              />
            </div>

            <div className="flex items-center justify-center mt-6 font-bold text-gray-900 dark:text-gray-200">
              Create Account
            </div>

            <div className="relative flex items-center mt-8 w-full">
              <input
                type="text"
                className="block w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
                placeholder="Username"
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
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

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:border-green-500 focus:ring focus:ring-green-300 focus:outline-none"
                type="password"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white bg-green-700 dark:bg-green-600 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300">
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-white/30 dark:bg-gray-700/70 rounded-b-2xl">
          <span className="text-sm text-gray-800 dark:text-gray-300">
            Already have an account?
          </span>

          <a
            href="Login"
            className="ml-2 text-sm font-bold text-green-700 dark:text-green-400 hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
