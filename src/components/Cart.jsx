import { useState } from "react";
import { useCart } from "../context/CartProvider";
import { FiTrash } from "react-icons/fi";
import { useTheme } from "../context/ThemeProvider";
import { Gift, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { removeFromCart, increaseQty, decreaseQty, cartItems, isLoading } =
    useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handlePayClick = () => {
    navigate("/payment");
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = 15; // Fixed shipping cost
  const totalAmount = totalCost + shippingCost;
  const discountedTotal = totalAmount * (1 - discount / 100);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-center flex-grow py-10 px-6 md:px-10">
        <div
          className={`w-full max-w-5xl mx-auto shadow-lg rounded-xl p-8 transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
          style={{ minHeight: "500px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ✅ Cart Items - Left */}
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

              {isLoading ? (
                <div className="text-center text-gray-500 dark:text-gray-300 py-10">
                  Loading cart...
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center text-lg font-semibold py-10">
                  Your cart is currently empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center cursor-pointer justify-between p-4 rounded-lg transition-all ${
                      darkMode
                        ? "border-gray-700 bg-gray-700"
                        : "border-gray-200 bg-gray-100"
                    } mb-3`}
                    onClick={() => {
                      navigate(`/plant/${item.plantId}`);
                    }}
                  >
                    <img
                      src={item.imagePath}
                      alt={item.plantName}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <div className="flex-1 ml-4">
                      <p className="text-lg font-bold">{item.plantName}</p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
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
                      <span className="px-3">{item.quantity}</span>
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
                ))
              )}
            </div>

            {/* ✅ Summary Orders - Right */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Summary Orders</h3>

              <div className="space-y-4">
                <p>
                  Total: <span className="float-right">{totalCost} L.E</span>
                </p>
                <p>
                  Shipping:{" "}
                  <span className="float-right">{shippingCost} L.E</span>
                </p>
                {isPromoApplied && (
                  <p>
                    Discount ({discount}%):{" "}
                    <span className="float-right">
                      -{totalAmount * (discount / 100)} L.E
                    </span>
                  </p>
                )}
                <p className="font-bold">
                  Total Cost:{" "}
                  <span className="float-right">
                    {isPromoApplied ? discountedTotal.toFixed(2) : totalAmount}{" "}
                    L.E
                  </span>
                </p>
              </div>

              <button
                className="mt-6 bg-[#5AAC38] text-white p-2 rounded w-full"
                onClick={handlePayClick}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
