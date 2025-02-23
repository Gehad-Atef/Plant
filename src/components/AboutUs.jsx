import AboutImage from "../assets/Images/About.png";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "./Navbar";

const aboutArray = [
  {
    title: "Plant Care Guides",
    description:
      "Comprehensive guides to help you nurture your plants and keep them thriving.",
  },
  {
    title: "Gardening Tips",
    description:
      "Expert advice for indoor and outdoor gardening, tailored to all skill levels.",
  },
  {
    title: "Plant Shop Recommendations",
    description:
      "Curated recommendations for trusted plant stores and nurseries.",
  },
  {
    title: "Plant Identification",
    description:
      "Tools and resources to identify plant species and learn their unique characteristics.",
  },
  {
    title: "Community Forum",
    description:
      "A space to connect with fellow plant lovers, share experiences, and exchange advice.",
  },
  {
    title: "Eco-Friendly Practices",
    description:
      "Tips and resources to grow plants sustainably and reduce your environmental footprint.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-green-200 to-white min-h-screen flex flex-col">
      {/* ✅ Navbar added */}
      <Navbar />

      <div className="flex flex-col md:flex-row items-center md:items-start px-10 pt-5 flex-grow">
        <div className="w-full md:min-w-2/3 min-h-screen pl-5 pr-5 md:pl-10 md:pr-16 font-serif flex flex-col items-center md:items-start">
          <div className="w-full md:w-auto text-center md:text-left">
            <h3 className="text-[#82C357] text-[20px] md:text-[25px] font-bold">
              About Us
            </h3>
            <p className="text-[24px] md:text-[30px] font-bold text-[#2C3B23] pt-3 pb-3">
              What is Planters?
            </p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">
              Welcome to PLANTERS, your ultimate destination for all things
              plants! Our passionate team shares tips, guides, and inspiration
              to make your plant journey easy and enjoyable. We’re committed to
              fostering a global community of plant lovers and promoting
              sustainable practices.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 h-auto md:w-full md:pt-10 pb-10 text-center md:text-left md:grid-cols-2 md:grid-rows-3">
            {aboutArray.map((item) => (
              <div className="p-3 relative" key={item.title}>
                <FaCheckCircle className="absolute text-[25px] left-1/2 text-[#82C357] mt-1 text-center md:left-0" />
                <div className="ml-7 mt-6 md:mt-0">
                  <h3 className="text-[20px] md:text-[22px] text-[#2C3B23] font-bold">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-[16px] md:text-[18px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex min-w-[250px] lg:flex lg:min-w-[300px] relative justify-center">
          <div className="relative w-full h-[200px] md:h-[300px] rounded-[80px] md:rounded-[50px] overflow-hidden shadow-[20px_20px_0px_0px_rgba(201,249,170,0.7)] z-10">
            <img
              src={AboutImage}
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
