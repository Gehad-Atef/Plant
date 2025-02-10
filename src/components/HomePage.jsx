import lavenderImage from "../assets/Images/Lavende.png";
import lewisiaImage from "../assets/Images/Lewisia.png";
import plantImage from "../assets/Images/image.png";

const PlantShop = () => {
  return (
    <div className="bg-gradient-to-r from-green-200 to-white min-h-screen font-sans">
      {/* Hero Section */}
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
          <button className="mt-8 bg-gray-800 text-white px-8 py-2 rounded-full text-lg hover:bg-green-700">
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

      {/* Products Section */}
      <div className="flex flex-wrap justify-center gap-8 px-10 pb-16">
        {/* Lavender Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 flex items-center gap-4">
          <img
            src={lavenderImage}
            alt="Lavender"
            className="w-32 h-32 object-contain"
          />
          <div>
            <h3 className="text-green-600 font-semibold">INDOOR</h3>
            <h2 className="text-xl font-bold text-gray-700">Lavender</h2>
            <p className="text-gray-600 text-sm mt-2">
              Lavender is an aromatic plant used in aromatherapy and skincare,
              known for its purple flowers.
            </p>
            <p className="text-green-700 font-bold text-lg mt-2">45 L.E</p>
          </div>
        </div>

        {/* Lewisia Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 flex items-center gap-4">
          <img
            src={lewisiaImage}
            alt="Lewisia"
            className="w-32 h-32 object-contain"
          />
          <div>
            <h3 className="text-green-600 font-semibold">INDOOR</h3>
            <h2 className="text-xl font-bold text-gray-700">Lewisia</h2>
            <p className="text-gray-600 text-sm mt-2">
              Lewisia is a vibrant flowering plant native to North America,
              known for its beautiful blooms.
            </p>
            <p className="text-green-700 font-bold text-lg mt-2">60 L.E</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantShop;
