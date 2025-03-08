import plantImage from "../assets/Images/image.png";

// Category Images
import indoorPlantImage from "../assets/Images/Indoor.png";
import outdoorPlantImage from "../assets/Images/Outdoor.png";
import cactusImage from "../assets/Images/Cactus.png";
import bonsaiImage from "../assets/Images/Bonsai.png";

// Plant categories as an array
const plantCategories = [
  { name: "Indoor Plant", image: indoorPlantImage },
  { name: "Outdoor Plant", image: outdoorPlantImage },
  { name: "Cactus", image: cactusImage },
  { name: "Bonsai", image: bonsaiImage },
];

const PlantShop = () => {
  return (
    <div className="bg-gradient-to-r from-green-200 to-white min-h-screen font-sans">
      {/* 🌿 Hero Section */}
      <header className="px-10 py-16 flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        <div className="max-w-xl">
          <h2 className="text-5xl font-semibold text-gray-700">
            Think <span className="text-green-600">Green</span> and
            <span className="text-green-600"> Plant</span> Something
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            Everything about plants, from gardening tips and houseplant care to
            exploring different species and their benefits.
          </p>
          <button className="mt-8 bg-green-700 text-white px-8 py-2 rounded-full text-lg hover:bg-green-800 transition">
            Join Us
          </button>
        </div>
        <div className="ml-10 flex items-center">
          <img
            src={plantImage}
            alt="Plant"
            className="w-[350px] h-[350px] object-contain"
          />
        </div>
      </header>

      {/* 🌱 Category Section */}
      <section className="px-10 pb-16">
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-8">
          Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {plantCategories.map((category, index) => (
            <PlantCategory key={index} {...category} />
          ))}
        </div>
      </section>
    </div>
  );
};

// ✅ Extracted Plant Category Component
const PlantCategory = ({ name, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-72 flex flex-col items-center text-center hover:scale-105 transition-transform">
      <img src={image} alt={name} className="w-32 h-32 object-contain mb-3" />
      <h3 className="text-lg font-bold text-gray-700">{name}</h3>
      <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded-full text-sm hover:bg-green-700 transition">
        Shop Now
      </button>
    </div>
  );
};

export default PlantShop;
