import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

// Helper function to handle image paths
const getFullImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400x300"; // Fallback image
    return url; // Return the URL as-is
};

const PlantDetail = () => {
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("description"); // For tabbed interface
    const { addToCart, cartItems } = useCart();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the plant id from the URL

    const handleAddToCart = () => {
        const plantWithQuantity = { ...plant, quantity };

        const existingCartItem = cartItems.find(
            (item) => item.id === plantWithQuantity.id
        );

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            addToCart(plantWithQuantity);
        }

        navigate("/cart");
    };

    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(
            1,
            Math.min(e.target.value, plant?.quantity)
        );
        setQuantity(newQuantity);
    };

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const response = await fetch(
                    `https://greenland.runasp.net/api/Plant/${id}`
                );
                //const response = await fetch(`https://localhost:7286/api/Plant/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch plant details.");
                }
                const data = await response.json();
                setPlant(data); // Assuming the plant details are inside 'value'
                setLoading(false);
            } catch (error) {
                console.error("Error fetching plant details:", error);
                setError("Failed to fetch plant details.");
                setLoading(false);
            }
        };

        fetchPlant();
    }, [id]);

    // useEffect(() => {
    //     const cartItem = cartItems.find((item) => item.id === parseInt(id));
    //     if (cartItem) {
    //         setQuantity(cartItem.quantity);
    //     }
    // }, [id, cartItems]);
    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                <h1 className="text-2xl font-bold">
                    Oops! Something went wrong.
                </h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            {plant && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Image Carousel */}
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                        <img
                            src={getFullImageUrl(plant.imageUrl)} // Handle broken images
                            alt={plant.name}
                            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                                e.target.src =
                                    "https://via.placeholder.com/400x300"; // Fallback image
                                e.target.onerror = null;
                            }}
                        />
                    </div>

                    {/* Right Column: Details */}
                    <div className="flex flex-col justify-between">
                        {/* Plant Name and Price */}
                        <div>
                            <h2 className="text-3xl font-bold text-green-800 dark:text-white mb-4">
                                {plant.name}
                            </h2>
                            <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-4">
                                Price: ${plant.price.toFixed(2)}
                            </p>

                            {/* Tabs for Description, How to Plant, and Availability */}
                            <div className="mb-6">
                                <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-600">
                                    <button
                                        onClick={() =>
                                            setActiveTab("description")
                                        }
                                        className={`pb-2 ${
                                            activeTab === "description"
                                                ? "border-b-2 border-green-600 text-green-800 dark:text-white font-bold"
                                                : "text-gray-600 dark:text-gray-400"
                                        } hover:text-green-800 dark:hover:text-white transition duration-300`}
                                    >
                                        Description
                                    </button>
                                    <button
                                        onClick={() =>
                                            setActiveTab("howToPlant")
                                        }
                                        className={`pb-2 ${
                                            activeTab === "howToPlant"
                                                ? "border-b-2 border-green-600 text-green-800 dark:text-white font-bold"
                                                : "text-gray-600 dark:text-gray-400"
                                        } hover:text-green-800 dark:hover:text-white transition duration-300`}
                                    >
                                        How to Plant
                                    </button>
                                    <button
                                        onClick={() =>
                                            setActiveTab("availability")
                                        }
                                        className={`pb-2 ${
                                            activeTab === "availability"
                                                ? "border-b-2 border-green-600 text-green-800 dark:text-white font-bold"
                                                : "text-gray-600 dark:text-gray-400"
                                        } hover:text-green-800 dark:hover:text-white transition duration-300`}
                                    >
                                        Availability
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="mt-4">
                                    {activeTab === "description" && (
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {plant.description}
                                        </p>
                                    )}
                                    {activeTab === "howToPlant" && (
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {plant.how_To_Plant}
                                        </p>
                                    )}
                                    {activeTab === "availability" && (
                                        <div>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <strong>Category:</strong>{" "}
                                                {plant.categoryName}
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <strong>Availability:</strong>{" "}
                                                {plant.is_Available ? (
                                                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                                                        Available
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <strong>
                                                    Quantity in Stock:
                                                </strong>{" "}
                                                {plant.quantity}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons with Quantity Selector */}
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center space-x-4">
                                <label
                                    htmlFor="quantity"
                                    className="text-gray-700 dark:text-gray-300"
                                >
                                    Quantity:
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="1"
                                    max={plant.quantity}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            <div className="space-x-4">
                                <button
                                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>
                                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlantDetail;
