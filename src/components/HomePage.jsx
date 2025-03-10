import { motion } from "framer-motion";
import plantImage from "../assets/Images/image.png";

// Category Images
import indoorPlantImage from "../assets/Images/Indoor.png";
import outdoorPlantImage from "../assets/Images/Outdoor.png";
import cactusImage from "../assets/Images/Cactus.png";
import bonsaiImage from "../assets/Images/Bonsai.png";
import { useTheme } from "../context/ThemeProvider";
import { Quote } from "lucide-react";

// Plant categories as an array
const plantCategories = [
  { name: "Indoor Plant", image: indoorPlantImage },
  { name: "Outdoor Plant", image: outdoorPlantImage },
  { name: "Cactus", image: cactusImage },
  { name: "Bonsai", image: bonsaiImage },
];

const PlantShop = () => {
  const { darkMode } = useTheme(); // 🌙 Check if Dark Mode is enabled

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-green-200 to-white text-gray-900"
      }`}
    >
      {/* 🌿 Hero Section */}
      <header className="px-10 py-16 flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        <div className="max-w-xl">
          <h2 className="text-5xl font-semibold">
            Think <span className="text-green-600">Green</span> and
            <span className="text-green-600"> Plant</span> Something
          </h2>
          <p className="mt-6 text-lg">
            Everything about plants, from gardening tips and houseplant care to
            exploring different species and their benefits.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-8 bg-green-700 text-white px-8 py-3 rounded-full text-lg hover:bg-green-800 transition"
          >
            Join Us
          </motion.button>
        </div>
        <div className="ml-10 flex items-center">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={plantImage}
            alt="Plant"
            className="w-[350px] h-[350px] object-contain"
          />
        </div>
      </header>

      {/* 🌱 Category Section */}
      <section className="px-10 pb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {plantCategories.map((category, index) => (
            <PlantCategory key={index} {...category} />
          ))}
        </div>
      </section>

      {/* 🍃 Benefits Section */}
      <section className="px-10 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-8">Why Choose Plants?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard
            title="Purifies Air"
            description="Plants improve air quality by absorbing toxins and releasing oxygen."
          />
          <BenefitCard
            title="Boosts Mood"
            description="Being around plants can help reduce stress and increase happiness."
          />
          <BenefitCard
            title="Enhances Decor"
            description="Plants add beauty and serenity to your living space."
          />
        </div>
      </section>

      {/* 🏆 Testimonials Section */}
      <section className="px-10 py-16 text-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold mb-8">What Our Customers Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Testimonial
            name="Sarah Johnson"
            quote="Absolutely love my new indoor plants! They make my home feel so fresh."
          />
          <Testimonial
            name="Michael Smith"
            quote="Great quality plants, fast delivery, and excellent customer service!"
          />
        </div>
      </section>

      {/* 📩 Newsletter Section */}
      <section className="px-10 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Newsletter</h2>
        <p className="text-lg mb-6">
          Get the latest updates and exclusive discounts!
        </p>
        <NewsletterSignup />
      </section>

      {/* 📌 Footer */}
      <footer className="text-center py-6 bg-gray-200 dark:bg-gray-900 dark:text-white">
        <p>
          &copy; {new Date().getFullYear()} Plant Store. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// ✅ Extracted Plant Category Component
const PlantCategory = ({ name, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-72 flex flex-col items-center text-center transition-transform"
    >
      <img src={image} alt={name} className="w-32 h-32 object-contain mb-3" />
      <h3 className="text-lg font-bold">{name}</h3>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-3 bg-green-600 text-white px-6 py-2 rounded-full text-sm hover:bg-green-700 transition"
      >
        Shop Now
      </motion.button>
    </motion.div>
  );
};

// ✅ Extracted Benefit Card Component
const BenefitCard = ({ title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center transition-transform"
  >
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="mt-2">{description}</p>
  </motion.div>
);

// ✅ Extracted Testimonial Component
const Testimonial = ({ name, quote }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center transition-transform"
  >
    <p className="italic flex gap-2">
      <Quote size={16} />
      {quote}
      <Quote size={16} />
    </p>
    <h4 className="mt-3 font-bold">{name}</h4>
  </motion.div>
);

// ✅ Extracted Newsletter Signup Component
const NewsletterSignup = () => (
  <div className="flex justify-center">
    <input
      type="email"
      placeholder="Enter your email"
      className="p-3 border border-gray-300 rounded-l-lg w-72 focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
    />
    <motion.button
      whileHover={{ scale: 1.1 }}
      className="bg-green-700 text-white px-6 py-3 rounded-r-lg hover:bg-green-800 transition"
    >
      Subscribe
    </motion.button>
  </div>
);

export default PlantShop;
