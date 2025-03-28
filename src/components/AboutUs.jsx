import { useTheme } from "../context/ThemeProvider";
import AboutImage from "../assets/Images/About.png";
import { CheckCircle } from "lucide-react";

// About Page Features
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
    const { darkMode } = useTheme();

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
        >
            {/* ✅ Hero Section */}
            <section className="flex flex-col md:flex-row items-center px-6 md:px-10 pt-5 flex-grow">
                {/* ✅ About Text */}
                <div className="w-full md:w-2/3 px-4 md:px-10 font-serif flex flex-col items-center md:items-start">
                    <div className="text-center md:text-left">
                        <h3 className="text-[#82C357] text-lg md:text-xl font-bold">
                            About Us
                        </h3>
                        <p
                            className={`text-xl md:text-2xl font-bold pt-3 pb-3 ${
                                darkMode ? "text-green-400" : "text-[#2C3B23]"
                            }`}
                        >
                            What is Planters?
                        </p>
                        <p
                            className={`text-base md:text-lg leading-relaxed ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                        >
                            Welcome to PLANTERS, your ultimate destination for
                            all things plants! Our passionate team shares tips,
                            guides, and inspiration to make your plant journey
                            easy and enjoyable. We’re committed to fostering a
                            global community of plant lovers and promoting
                            sustainable practices.
                        </p>
                    </div>

                    {/* ✅ About Features */}
                    <div className="grid grid-cols-1 w-[60%] m-auto sm:grid-cols-2 sm:w-full gap-4 md:gap-5 pt-8 md:pt-10 text-center md:text-left">
                        {aboutArray.map((item, index) => (
                            <FeatureItem
                                key={index}
                                title={item.title}
                                description={item.description}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>
                </div>

                {/* ✅ About Image */}
                <div className="hidden md:flex min-w-[250px] xl:min-w-[300px] justify-center">
                    <div
                        className={`relative w-full h-[220px] md:h-[300px] rounded-[50px] overflow-hidden transition-all ${
                            darkMode
                                ? "shadow-[15px_15px_0px_0px_rgba(40,130,40,0.7)]"
                                : "shadow-[15px_15px_0px_0px_rgba(201,249,170,0.7)]"
                        }`}
                    >
                        <img
                            src={AboutImage}
                            alt="About Us"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

// ✅ Extracted FeatureItem Component
const FeatureItem = ({ title, description, darkMode }) => {
    return (
        <div className="p-3 relative flex flex-col sm:flex-row items-center md:items-start text-center sm:text-left">
            <CheckCircle
                className={`text-[25px] ${
                    darkMode ? "text-green-400" : "text-[#82C357]"
                } sm:absolute sm:left-0 sm:top-2`}
            />
            <div className="sm:ml-8 mt-2 sm:mt-0">
                <h3
                    className={`text-lg md:text-xl font-bold ${
                        darkMode ? "text-green-300" : "text-[#2C3B23]"
                    }`}
                >
                    {title}
                </h3>
                <p
                    className={`text-sm md:text-base ${
                        darkMode ? "text-gray-400" : "text-zinc-500"
                    }`}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
