import { motion } from "framer-motion";
import axios from "axios";
import { useTheme } from "../context/ThemeProvider";
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
import { FaRegEye } from "react-icons/fa";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

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
    const [categories, setCategories] = useState([]);
    const [trendyPlants, setTrendyPlants] = useState([]);
    // const [selectedId, setSelectedId] = useState(null);
    // function handleSelectedId(id) {
    //     setSelectedId(selectedId);
    //     console.log(id);
    // }
    useEffect(() => {
        axios
            .get("https://greenland.runasp.net/Category")
            // .get("https://localhost:7286/Category")
            .then((response) => {
                console.log(response);
                setCategories(response.data.value.items);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    useEffect(() => {
        axios
            // .get("https://localhost:7286/api/plant")
            .get("https://greenland.runasp.net/api/plant")
            .then((response) => {
                setTrendyPlants(response.data.value.items);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    const navigate = useNavigate();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);
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
                    {categories.slice(1, 5).map((category, index) => (
                        <PlantCategory key={index} category={category} />
                    ))}
                </div>
                <div className="flex justify-end mt-7">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className=" bg-gray-400  w-[220px] h-[40px] text-white text-xl rounded-md"
                        onClick={() => navigate("/Categories")}
                    >
                        All Categories
                    </motion.button>
                </div>
            </section>
            {/* Trendy Products */}
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            when: "beforeChildren",
                            staggerChildren: 0.05,
                            duration: 0.4,
                        },
                    },
                }}
                className={`w-full h-auto p-6 pb-[100px] ${
                    darkMode ? "bg-gray-900 text-white" : "bg-[#F0F9EB]"
                }`}
            >
                <h2 className="text-[40px] text-center font-bold mb-12 tracking-wide">
                    Trendy Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                    {trendyPlants.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.3,
                                    },
                                },
                            }}
                            className={`w-full max-w-[280px] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl flex flex-col overflow-hidden ${
                                darkMode ? "bg-gray-800 text-white" : "bg-white"
                            }`}
                            onClick={() => navigate(`/plant/${item.id}`)}
                        >
                            <div
                                className="w-full h-[200px] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                }}
                            />

                            <div className="text-center px-4 py-4">
                                <div className="flex-1">
                                    <p className="text-lg font-semibold truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-green-600 font-bold">
                                        {item.categoryName}
                                    </p>
                                </div>

                                {/* <div className="flex gap-2 items-center">
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        className="text-gray-500 hover:text-black transition"
                                    >
                                        <FaRegEye className="text-[24px]" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-md transition"
                                        // onClick={() => onSelectedId(item.id)}
                                    >
                                        <RiShoppingBasket2Line className="text-[24px]" />
                                    </motion.button>
                                </div> */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

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
                    {trendyPlants.slice(5, 7).map((item) => (
                        <>
                            <PlantsDeal
                                img={item.imageUrl}
                                title={item.name}
                                delPrice={"20 L.E"}
                                price={item.price}
                                id={item.id}
                            />
                        </>
                    ))}
                </div>
            </section>

            {/* What Clients say! */}
            <section
                className={`w-full  p-20 ${
                    darkMode ? "bg-gray-800 " : "bg-[#F0F9EB]"
                }`}
            >
                <div className="flex flex-col  w-[90%] m-auto mb-20 md:flex-row justify-between text-center">
                    <h2 className="text-3xl font-semibold  mb-6 md:text-5xl">
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
                        ? "bg-gray-900"
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
const PlantCategory = ({ category }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex bg-slate-400 w-full max-w-[300px] h-[250px] rounded-lg relative"
            style={{
                backgroundImage: `url(${category.imagePath})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="absolute w-full h-full bg-[rgb(48,48,48,0.4)] rounded-lg"></div>
            <div className="absolute left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h2 className="text-white text-3xl font-semibold whitespace-nowrap">
                    {category.name}
                </h2>
                <button
                    className="mt-2 bg-green-600 rounded-sm text-white p-1  font-semibold  shadow-md hover:bg-green-700 "
                    onClick={() => navigate(`/category/${category.id}`)}
                >
                    Show Plants
                </button>
            </div>
        </motion.div>
    );
};

function DivsOfDeal({ number, time }) {
    return (
        <div className="text-center min-w-[60px] h-[50px] bg-[#5AAC38] rounded-md text-white leading-tight md:h-[60px] md:p-1">
            <h3 className="text-xl">{number}</h3>
            <span>{time}</span>
        </div>
    );
}
function PlantsDeal({ img, title, delPrice, price, id }) {
    const { darkMode } = useTheme();
    const navigate = useNavigate();
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
                    <span className="font-semibold">
                        &nbsp; &nbsp;{price} L.E
                    </span>
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
                    className={`bg-[#EDF4F6] rounded-lg w-xl flex items-center  font-semibold p-1 w-[120px] justify-center 
                        ${darkMode ? "text-[#5AAC38]" : "text-[#4B633B]"}`}
                    onClick={() => navigate(`/plant/${id}`)}
                >
                    Show Details
                </motion.button>
            </div>
        </motion.div>
    );
}
export default PlantShop;
