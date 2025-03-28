import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import indoorPlantImage from "../assets/Images/Indoor.png";
import outdoorPlantImage from "../assets/Images/Outdoor.png";
import cactusImage from "../assets/Images/Cactus.png";
import bonsaiImage from "../assets/Images/Bonsai.png";
import essentialPlant from "../assets/Images/essentialPlant.png";
import secondHomePlant from "../assets/Images/secondHomePlant.png";
import { useState, useEffect } from "react";
import Cheery from "../assets/Images/Cheery.jpeg";
import Jasmine from "../assets/Images/Jasmine.jpeg";
import { LuShoppingCart } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Person1 from "../assets/Images/Person1.jpg";
import Person2 from "../assets/Images/Person2.jpg";
import Person3 from "../assets/Images/Person3.avif";
import CirclePlant1 from "../assets/Images/CirclePlant1.jpg";
import CirclePlant2 from "../assets/Images/CirclePlant2.jpg";
import CirclePlant3 from "../assets/Images/CirclePlant3.jpg";
import CirclePlant4 from "../assets/Images/CirclePlant4.jpg";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiShoppingBasket2Line } from "react-icons/ri";
import TrendyPlant1 from "../assets/Images/TrendyPlant1.png";
import TrendyPlant2 from "../assets/Images/TrendyPlant2.png";
import TrendyPlant3 from "../assets/Images/TrendyPlant3.png";
// Plant categories as an array
const plantCategories = [
    { name: "Indoor Plant", image: indoorPlantImage },
    { name: "Outdoor Plant", image: outdoorPlantImage },
    { name: "Cactus", image: cactusImage },
    { name: "Bonsai", image: bonsaiImage },
];
const trendyPlans = [
    {
        image: TrendyPlant3,
        title: "Kuwu Potted Faux ",
        price: "৳700.00",
    },

    {
        image: TrendyPlant2,
        title: "Calathea Orbifolia",
        price: "৳700.00",
    },
    {
        image: TrendyPlant3,
        title: "Kuwu Potted Faux ",
        price: "৳700.00",
    },
    {
        image: TrendyPlant1,
        title: " Indoor Houseplant",
        price: "৳700.00",
    },
    {
        image: TrendyPlant3,
        title: "Kuwu Potted Faux ",
        price: "৳700.00",
    },

    {
        image: TrendyPlant2,
        title: "Calathea Orbifolia",
        price: "৳700.00",
    },
    {
        image: TrendyPlant3,
        title: "Kuwu Potted Faux ",
        price: "৳700.00",
    },
    {
        image: TrendyPlant1,
        title: " Indoor Houseplant",
        price: "৳700.00",
    },
];
const testimonials = [
    {
        name: "Sara",
        image: Person1,
        role: "Manager @ Howarts",
        text: '"Succulents arrived fresh! Loved the watering tips. One leaf was slightly damaged, but it recovered fast"',
    },
    {
        name: "Ali",
        image: Person2,
        role: "Manager @ Slytherin",
        text: '"Great quality plants! My Monstera arrived healthy with a helpful care guide. Growing beautifully!"',
    },
    {
        name: "Yosif",
        image: Person3,
        role: "Team Leader @ Gryffindor",
        text: '"Perfect Lavender! Fresh, fragrant, and the care guide was super useful. Thriving beautifully!"',
    },
];

const PlantShop = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };
    const { darkMode } = useTheme();
    // const [plants, setPlants] = useState([]);
    useEffect(() => {
        fetch("https://plantopia.runasp.net/plants")
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div
            className={`min-h-screen font-sans transition-colors duration-300 ${
                darkMode ? "bg-gray-900 text-white" : " text-gray-900"
            }`}
        >
            <div className="md:h-[100vh]">
                <div className=" h-[100%] w-[94%] mx-[3%] flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="h-full w-full md:w-1/2  py-10 px-20 text-center md:px-20 md:text-left ">
                        <h1 className="text-5xl leading-[60px]  font-serif">
                            Think <span className="text-green-600">Green </span>
                            and <span className="text-green-600">Plant </span>
                            Something
                        </h1>
                        <p className="my-10 text-lg">
                            Learn the art of combining plants, soil, and
                            decorative elements to craft a thriving,
                            self-sustaining ecosystem.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-green-700 text-white px-5 py-2 rounded-xl text-xl hover:bg-green-800 transition block m-auto md:inline"
                        >
                            Join Us
                        </motion.button>
                    </div>

                    <div
                        className={`w-full md:w-1/2  rounded-xl relative ${
                            darkMode ? "bg-[#b5c7ac]" : "bg-[#E8FFDE]"
                        }`}
                    >
                        <div
                            className={`w-[320px] h-[160px] absolute right-10 bottom-10  rounded-xl shadow-lg ${
                                darkMode
                                    ? "bg-gray-900 text-white"
                                    : " text-gray-900 bg-white"
                            }`}
                        >
                            <div className="w-[230px] h-full  p-2  ">
                                <h3 className="font-bold leading-tight pb-2">
                                    Elegant Indoor Bird of Paradise Plant
                                </h3>
                                <p
                                    className={`leading-tight  ${
                                        darkMode
                                            ? "text-white"
                                            : "text-[#4D4D4D]"
                                    }`}
                                >
                                    The Bird of Paradise plant is a stunning
                                    addition to any indoor space, known for its
                                    large, lush green leaves and exotic appeal.
                                </p>
                                <div>
                                    <img
                                        src={secondHomePlant}
                                        className=" absolute -bottom-9 -right-14 w-3/4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="-translate-x-5 ml-4 lg:-translate-x-1/4 md:-translate-x-1/3 ">
                            <img src={essentialPlant} className="w-[230px] " />
                        </div>
                    </div>
                </div>
            </div>

            {/* 🌱 Category Section */}
            <section className="p-10 mb-20">
                <h2 className="text-[40px] font-semibold text-center mb-8">
                    Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
                    {plantCategories.map((category, index) => (
                        <PlantCategory key={index} {...category} />
                    ))}
                </div>
            </section>
            {/* Trendy Products */}
            <div
                className={`w-full h-auto  p-6 pb-[100px] ${
                    darkMode ? "bg-gray-900 text-white" : "bg-[#F0F9EB]"
                }`}
            >
                <h2
                    className={` my-5 text-[40px] text-center font-semibold mb-10`}
                >
                    Trendy Products
                </h2>
                <div className="p-3 w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
                    {trendyPlans.map((item) => (
                        <div
                            className={` shadow-lg h-[300px] w-full max-w-[300px]  rounded-lg  flex flex-col ${
                                darkMode ? "bg-gray-800 " : "  bg-white"
                            }`}
                            key={item.title}
                        >
                            <div className="w-[80%] mx-[10%] min-h-[220px] flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-[200px] h-[220px] object-contain m-auto"
                                />
                            </div>

                            <div className="flex justify-between items-center w-[80%] mx-[10%] h-[60px] text-md md:text-lg">
                                <div className="w-full flex flex-col justify-center">
                                    <p className="leading-tight font-semibold  truncate">
                                        {item.title}
                                    </p>
                                    <p className=" font-medium">{item.price}</p>
                                </div>

                                <motion.button whileHover={{ scale: 1.1 }}>
                                    <RiShoppingBasket2Line className="text-3xl p-1 rounded-md text-white bg-[#5AAC38] cursor-pointer  " />
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Deal of the week */}
            <section className="w-auto h-auto p-4">
                <div className="flex flex-col items-center  w-[60%] m-auto p-4 lg:flex-row lg:justify-between">
                    <h2 className="text-2xl text-center font-semibold md:text-4xl lg:text-4xl ">
                        Deal Of The Week
                    </h2>

                    <div className="flex gap-2 mt-4  md:flex-row lg:mt-0">
                        <DivsOfDeal number={10} time={"Days"} />
                        <DivsOfDeal number={19} time={"Hours"} />
                        <DivsOfDeal number={59} time={"Minutes"} />
                        <DivsOfDeal number={57} time={"Seconds"} />
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 gap-3 place-items-center mt-20 mb-20 md:grid-cols-2 ">
                    <PlantsDeal
                        img={Cheery}
                        title={"Cheery Blossom"}
                        delPrice={"100 L.E"}
                        price={"85 L.E"}
                    />
                    <PlantsDeal
                        img={Jasmine}
                        title={"Jasmine"}
                        delPrice={"70 L.E"}
                        price={"45 L.E"}
                    />
                </div>
            </section>

            {/* What Clients say! */}
            <section
                className={`w-full  p-20 ${
                    darkMode ? "bg-gray-800 " : "bg-[#F0F9EB]"
                }`}
            >
                <div className="flex flex-col justify-between w-[90%] m-auto mb-20 md:flex-row justify-center text-center">
                    <h2 className="text-3xl font-semibold font-bold mb-6 md:text-5xl">
                        What Clients Say!
                    </h2>
                    <div
                        className={`w-[120px] flex justify-between  m-auto md:m-0`}
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaArrowLeft
                                onClick={prevTestimonial}
                                className={`w-11 h-11 flex items-center justify-center rounded-full ${
                                    darkMode ? "bg-gray-900 " : "bg-white"
                                } `}
                            />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaArrowRight
                                onClick={nextTestimonial}
                                className={`w-11 h-11 flex items-center justify-center rounded-full ${
                                    darkMode ? "bg-gray-900 " : "bg-white"
                                } `}
                            />
                        </motion.button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 justify-center w-full lg:w-[80%] m-auto overflow-hidden">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-lg transition-all duration-300 
                ${darkMode ? "bg-gray-800 text-white" : "border-gray-300"} 
                ${
                    index === activeIndex
                        ? "scale-110 p-6 " +
                          (darkMode ? "bg-gray-400" : "bg-green-100")
                        : darkMode
                        ? "bg-gray-600"
                        : "bg-white"
                }`}
                        >
                            <p className="text-lg font-medium">
                                {testimonial.text}
                            </p>
                            <div className="flex items-center w-full gap-3 my-3">
                                <div>
                                    <img
                                        src={testimonial.image}
                                        className="w-[50px] h-[50px] rounded-full"
                                    />
                                </div>
                                <div>
                                    <h4 className="mt-2 font-semibold">
                                        {testimonial.name}
                                    </h4>
                                    <small className="text-gray-500">
                                        {testimonial.role}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* On Our website */}
            <section
                className={`p-10 flex flex-col lg:flex-row items-center justify-center gap-12 ${
                    darkMode ? "bg-gray-900" : "bg-white"
                }`}
            >
                <div className="text-center lg:text-left max-w-screen-lg px-4">
                    <p className="text-[#5AAC38] text-3xl md:text-3xl lg:text-4xl font-semibold">
                        “ On our website, you won’t just enjoy nature—you’ll
                        become a part of it and live within it. 🌿✨ ”
                    </p>
                </div>

                <div className="relative w-full max-w-[480px] h-72 lg:h-80 mx-auto">
                    <img
                        src={CirclePlant1}
                        alt="Nature 1"
                        className="w-32 md:w-40 h-32 md:h-40 rounded-full object-cover shadow-lg absolute top-28 left-0 sm:-left-5"
                    />

                    <img
                        src={CirclePlant2}
                        alt="Nature 2"
                        className="w-36 md:w-44 h-36 md:h-44 rounded-full object-cover shadow-lg absolute top-3 left-20 sm:left-24 transform scale-105"
                    />

                    <img
                        src={CirclePlant3}
                        alt="Nature 3"
                        className="w-40 md:w-48 h-40 md:h-48 rounded-full object-cover shadow-lg absolute bottom-2 right-16 sm:right-24 transform scale-105"
                    />

                    <img
                        src={CirclePlant4}
                        alt="Nature 4"
                        className="w-36 md:w-44 h-36 md:h-44 rounded-full object-cover shadow-lg absolute -top-6 right-2 sm:right-0"
                    />
                </div>
            </section>

            <section
                className={`min-w-full h-[80vh]  flex flex-col px-6 ${
                    darkMode ? "bg-gray-800 " : "bg-[#F0F9EB]"
                }`}
            >
                <div
                    className={`w-full h-1/3 py-6 px-7 flex flex-col justify-center items-start ${
                        darkMode ? "text-gray-50" : "text-[#2C3B23]"
                    }`}
                >
                    <h2 className="text-xl py-2 sm:text-2xl md:text-[30px] font-semibold ">
                        Everything Planters,
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl  leading-tight ">
                        We’re your online destination. We offer a wide range of
                        various plants and instructions shipped directly from
                        our (green) house to yours!
                    </p>
                </div>

                <hr className="bg-gray-300 h-[1px] border-none w-full" />

                <div className="w-full h-1/3 flex flex-col justify-start items-start px-7 mt-4">
                    <h3 className="text-xl py-2 sm:text-2xl md:text-[30px] font-semibold ">
                        Get the scoop
                    </h3>
                    <p className="text-green-600 text-xl sm:text-2xl font-semibold mt-1">
                        Subscribe to our newsletter.
                    </p>
                    <div className="flex mt-3 w-full max-w-md">
                        <input
                            type="email"
                            placeholder="Email address"
                            className={`p-2 border rounded-md w-3/4 text-lg ${
                                darkMode ? "bg-gray-700" : "bg-white"
                            }`}
                        />
                        <button className="bg-green-900 text-white  w-[60px] text-[15px] rounded-md ml-3 sm:text-xl sm:w-[80px]">
                            Sign up
                        </button>
                    </div>
                </div>

                <hr className="bg-gray-300 h-[1px] border-none w-full mt-4" />

                <footer className="w-full h-1/3 flex flex-col justify-start items-center px-7">
                    <h3 className="text-xl sm:text-2xl md:text-[30px] font-semibold mt-6 ">
                        Follow us
                    </h3>
                    <div className="flex gap-8 mt-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <a
                                href="#"
                                className="text-green-600  hover:opacity-80 text-[30px]"
                            >
                                <FaFacebook />
                            </a>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <a
                                href="#"
                                className="text-green-600  hover:opacity-80 text-[30px]"
                            >
                                <FaTwitter />
                            </a>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <a
                                href="#"
                                className="text-green-600  hover:opacity-80 text-[30px]"
                            >
                                <FaPinterest />
                            </a>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <a
                                href="#"
                                className="text-green-600  hover:opacity-80 text-[30px] "
                            >
                                <FaInstagram />
                            </a>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <a
                                href="#"
                                className="text-green-600  hover:opacity-80 text-[30px]"
                            >
                                <MdEmail />
                            </a>
                        </motion.button>
                    </div>
                </footer>
            </section>
        </div>
    );
};

//  Category
const PlantCategory = ({ name, image }) => {
    const { darkMode } = useTheme();
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative  w-full max-w-[270px] h-[200px] rounded-xl"
        >
            <div
                className="absolute left-0 top-0 w-1/2 h-full  z-20 "
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            ></div>
            <div
                className={`absolute bottom-0 w-full h-[120px] flex items-center rounded-lg ${
                    darkMode ? "bg-[#b5c7ac]" : "bg-[#E8FFDE]"
                }`}
            >
                <div className="absolute right-2">
                    <h2 className="text-black text-xl font-semibold">{name}</h2>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="mt-2 bg-green-600 text-white w-[80px] py-1 rounded-lg shadow-md hover:bg-green-700"
                    >
                        Shop Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

//  Extracted Newsletter Signup Component

function DivsOfDeal({ number, time }) {
    return (
        <div className="text-center min-w-[60px] h-[50px] bg-[#5AAC38] rounded-md text-white leading-tight md:h-[60px] md:p-1">
            <h3 className="text-xl">{number}</h3>
            <span>{time}</span>
        </div>
    );
}
function PlantsDeal({ img, title, delPrice, price }) {
    const { darkMode } = useTheme();
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`border-[1px] border-[#889F79] rounded-md flex w-[350px] h-auto text-[#4B633B] lg:w-[480px] ${
                darkMode
                    ? "text-[#E8FFDE] bg-gray-800 border-none"
                    : "text-[#4B633B]"
            }`}
        >
            <div
                className={`w-[50%] h-[230px] 
                    
                `}
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="pt-5 pl-3  ">
                <h3 className=" font-semibold text-xl ">{title}</h3>
                <p className="pt-2 pb-2">
                    <del className="text-gray-500 font-semibold">
                        {delPrice}
                    </del>
                    <span className="font-semibold">&nbsp; &nbsp;{price}</span>
                </p>
                <div className="text-sm leading-[28px] mb-4">
                    <div className="flex items-center gap-2">
                        <FaCheck className="text-[#82C357] " />
                        <p>Pungent smell</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCheck className="text-[#82C357] " />
                        <p>Affordable price</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCheck className="text-[#82C357] " />
                        <p>Best Product</p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`bg-[#EDF4F6] rounded-lg w-xl flex items-center gap-2 font-semibold p-1 w-[120px] justify-center 
                        ${darkMode ? "text-[#5AAC38]" : "text-[#4B633B]"}`}
                >
                    <LuShoppingCart />
                    Buy Now
                </motion.button>
            </div>
        </motion.div>
    );
}
export default PlantShop;
