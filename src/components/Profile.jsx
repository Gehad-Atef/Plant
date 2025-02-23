import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaPlus } from "react-icons/fa";
import Navbar from "./Navbar";

function ProfileCard() {
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-white min-h-screen flex flex-col">
      {/* ✅ Navbar added */}
      <Navbar />

      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white shadow-lg rounded-xl p-12 w-[550px] h-[550px] mt-[-40px]">
          {/* Profile Image Section */}
          <div className="flex justify-center relative">
            <div className="relative w-32 h-32">
              <img
                src={image}
                alt="Profile"
                className="w-full h-full rounded-full shadow-md object-cover border-2 border-gray-300"
              />

              {/* Upload Button */}
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white text-sm flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition">
                <FaPlus />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <p className="text-black font-bold flex items-center">
                <FaUser className="mr-2" /> First Name
              </p>
              <p className="text-gray-600">Amelia</p>
            </div>
            <div>
              <p className="text-black font-bold flex items-center">
                <FaUser className="mr-2" /> Last Name
              </p>
              <p className="text-gray-600">Noah</p>
            </div>
            <div>
              <p className="text-black font-bold flex items-center">
                <FaUser className="mr-2" /> User Name
              </p>
              <p className="text-gray-600">amelia_no89</p>
            </div>
            <div>
              <p className="text-black font-bold flex items-center">
                <FaPhone className="mr-2" /> Phone no.
              </p>
              <p className="text-gray-600">+98 1245560090</p>
            </div>
            <div className="col-span-2">
              <p className="text-black font-bold flex items-center">
                <FaEnvelope className="mr-2" /> E-Mail
              </p>
              <p className="text-gray-600">AmeliaNoah@random.com</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8 flex justify-center">
            <button className="bg-green-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-800 transition text-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
