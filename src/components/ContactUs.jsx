import { useState } from "react";
import ContactImage from "../assets/Images/contact.jpg";

function ContactUs() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-gradient-to-r from-green-200 to-white py-16 px-6 md:px-20 min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-[75vh] w-[90%] max-w-7xl bg-white shadow-lg rounded-2xl p-14">
        {/* Left Section - Text Content */}
        <div className="flex flex-col justify-center space-y-5">
          <h1 className="text-green-700 font-semibold text-lg">CONTACT US</h1>
          <h3 className="text-4xl font-bold">Everything Planters</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            We are your online destination. We offer a wide range of various
            plants and instructions shipped directly from our (green) house to
            yours!
          </p>

          <h4 className="text-xl font-semibold">Get the scoop</h4>
          <p className="text-green-600 font-medium">
            Subscribe to our newsletter.
          </p>

          {/* Newsletter Form */}
          <div className="flex items-center space-x-3">
            <input
              type="email"
              className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-green-700 text-white px-8 py-4 rounded-lg shadow-md hover:bg-green-800 transition flex items-center justify-center space-x-2 text-lg font-semibold">
              <span>Sign</span>
              <span>Up</span>
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center">
          <img
            src={ContactImage}
            alt="Planter with seedlings"
            className="rounded-xl shadow-lg w-[300px] h-[420px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
export default ContactUs;
