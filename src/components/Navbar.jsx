import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gradient-to-r from-green-200 to-white py-4 px-10 flex justify-between text-center">
      <div className="flex flex-row items-center space-x-8 font-semibold text-gray-900 ml-24">
        {/* <Link to="/" className="text-lg font-bold text-green-700 mr-20">
          Plant Store
        </Link> */}
        <Link to="/" className="hover:text-green-600">
          Home
        </Link>
        <Link to="/about" className="hover:text-green-600">
          About Us
        </Link>
        <Link to="/categories" className="hover:text-green-600">
          Categories
        </Link>
        <Link to="/community" className="hover:text-green-600">
          Community
        </Link>
        <Link to="/contact" className="hover:text-green-600">
          Contact Us
        </Link>
      </div>
      <div className="flex items-center space-x-6 mr-24">
        <button className="bg-green-400 px-4 py-2 rounded-full flex items-center text-white hover:bg-green-600">
          <FaSearch className="text-black" />
        </button>
        <FaShoppingCart className="text-black text-xl cursor-pointer" />
        <FaUser
          className="text-black text-xl cursor-pointer"
          onClick={() => navigate("/Login")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
