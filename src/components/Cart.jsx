import { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import { FiTrash } from "react-icons/fi";
import { useTheme } from "../context/ThemeProvider";
import { Gift, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    getCartItems,
    addToCart,
    updateCartItem,
    deleteCartItem,
} from "../api/cartService"; // import the services

const Cart = () => {
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const {
        cartItems,
        setCartItems,
        removeFromCart,
        increaseQty,
        decreaseQty,
    } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [userId] = useState("user-id-placeholder"); // Make sure to get the real userId

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const items = await getCartItems({ userId });
                setCartItems(items); // Store the fetched items in context or state
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCart();
    }, [userId, setCartItems]);

    const handlePayClick = () => {
        navigate("/payment");
    };

    // Apply promo code logic
    const applyPromoCode = () => {
        const validPromoCodes = {
            SAVE10: 10, // 10% discount
            SAVE20: 20, // 20% discount
        };

        if (validPromoCodes[promoCode]) {
            setIsPromoApplied(true);
            setDiscount(validPromoCodes[promoCode]);
            alert("Promo code applied successfully!");
        } else {
            setIsPromoApplied(false);
            setDiscount(0);
            alert("Invalid promo code.");
        }
    };

    const totalCost = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const shippingCost = 15; // Fixed shipping cost
    const totalAmount = totalCost + shippingCost;

    // Calculate discounted total
    const discountedTotal = totalAmount * (1 - discount / 100);

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
        >
            <div className="flex items-center justify-center flex-grow py-10 px-6 md:px-10">
                <div
                    className={`w-full max-w-5xl shadow-lg rounded-xl p-8 transition-all ${
                        darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-900"
                    }`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* ✅ Cart Items - Left */}
                        <div className="col-span-2">
                            <h2 className="text-2xl font-bold mb-4">
                                Shopping Cart
                            </h2>
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center cursor-pointer justify-between p-4 rounded-lg transition-all ${
                                        darkMode
                                            ? "border-gray-700 bg-gray-700"
                                            : "border-gray-200 bg-gray-100"
                                    } mb-3`}
                                    onClick={() =>
                                        navigate(`/plant/${item.id}`)
                                    }
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-14 h-14 object-cover rounded-md"
                                    />
                                    <div className="flex-1 ml-4">
                                        <p className="text-lg font-bold">
                                            {item.name}
                                        </p>
                                        <p
                                            className={`text-sm ${
                                                darkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {item.price} L.E
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                decreaseQty(item.id);
                                            }}
                                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-3">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                increaseQty(item.id);
                                            }}
                                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <FiTrash
                                        className="text-red-500 cursor-pointer text-lg"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromCart(item.id);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* ✅ Summary Orders - Right */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold">
                                Summary Orders
                            </h3>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Promocode"
                                    value={promoCode}
                                    onChange={(e) =>
                                        setPromoCode(
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                                <button
                                    onClick={applyPromoCode}
                                    className="mt-2 bg-[#5AAC38] text-white p-2 rounded w-full flex justify-center items-center"
                                >
                                    APPLY <Plus className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                            <div className="mt-4">
                                <p>
                                    Total:{" "}
                                    <span className="float-right">
                                        {totalCost} L.E
                                    </span>
                                </p>
                                <p>
                                    Shipping:{" "}
                                    <span className="float-right">
                                        {shippingCost} L.E
                                    </span>
                                </p>
                                {isPromoApplied && (
                                    <p>
                                        Discount ({discount}%):{" "}
                                        <span className="float-right">
                                            -{totalAmount * (discount / 100)}{" "}
                                            L.E
                                        </span>
                                    </p>
                                )}
                                <p className="font-bold">
                                    Total Cost:{" "}
                                    <span className="float-right">
                                        {isPromoApplied
                                            ? discountedTotal.toFixed(2)
                                            : totalAmount}{" "}
                                        L.E
                                    </span>
                                </p>
                            </div>
                            <button
                                className="mt-4 bg-[#5AAC38] text-white p-2 rounded w-full"
                                onClick={handlePayClick}
                            >
                                Pay
                            </button>
                            <button className="mt-2 bg-gray-200 dark:bg-gray-700 text-[#5AAC38] flex justify-center items-center p-2 rounded w-full">
                                <Gift className="w-5 h-5 mr-2" /> Pay with Gift
                                Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
