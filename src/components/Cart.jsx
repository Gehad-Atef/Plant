import { useState } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaGift,
  FaMoneyBillAlt,
  FaPlus,
} from "react-icons/fa";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import { useTheme } from "../context/ThemeProvider";

const Cart = () => {
  const { darkMode } = useTheme();

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Lavender", price: 45, image: "lavender.png", quantity: 1 },
    { id: 2, name: "Lewisia", price: 60, image: "lewisia.png", quantity: 1 },
  ]);
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [promoCode, setPromoCode] = useState("");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = total >= 200 ? 0 : 15;
  const totalCost = total + shipping;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-green-200 to-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-center flex-grow py-10 px-6 md:px-10">
        <div
          className={`w-full max-w-5xl shadow-lg rounded-xl p-8 transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ✅ Cart Items - Left */}
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    darkMode
                      ? "border-gray-700 bg-gray-700"
                      : "border-gray-200 bg-gray-100"
                  } mb-3`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div className="flex-1 ml-4">
                    <p className="text-lg font-bold">{item.name}</p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {item.price} L.E
                    </p>
                    <button className="text-green-600 flex items-center gap-1 mt-1">
                      <FiEdit3 />
                      Edit Order
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-2 text-lg font-bold bg-gray-300 dark:bg-gray-600 rounded-md">
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button className="px-2 text-lg font-bold bg-gray-300 dark:bg-gray-600 rounded-md">
                      +
                    </button>
                  </div>
                  <FiTrash className="text-red-500 cursor-pointer text-lg" />
                </div>
              ))}
            </div>

            {/* ✅ Summary Orders - Right */}
            <div
              className={`border p-6 rounded-lg transition-all ${
                darkMode ? "border-gray-700 bg-gray-700" : "border-gray-200"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">Summary Orders</h2>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <p>Total</p>
                  <p>{total} L.E</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Shipping</p>
                  <p>{shipping} L.E</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <p>Total Cost</p>
                  <p>{totalCost} L.E</p>
                </div>
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Promo code"
                  className={`w-full p-2 border rounded-l-md ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                      : "border-gray-300"
                  }`}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-400 transition flex items-center">
                  APPLY <FaPlus className="ml-1 text-sm" />
                </button>
              </div>
              <button className="w-full bg-green-600 text-white py-3 mt-4 rounded-md hover:bg-green-500 transition">
                Pay Now
              </button>
            </div>
          </div>

          {/* ✅ Payment Methods */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <button className="flex items-center gap-2 text-green-600 font-medium mb-2">
              <FaPlus /> Add Payment Card
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  method: "visa",
                  label: "Visa Debit Card",
                  icon: <FaCcVisa className="text-blue-800 text-2xl" />,
                  last4: "5212",
                },
                {
                  method: "mastercard",
                  label: "MasterCard",
                  icon: <FaCcMastercard className="text-red-500 text-2xl" />,
                  last4: "8423",
                },
                {
                  method: "paypal",
                  label: "PayPal",
                  icon: <FaPaypal className="text-blue-500 text-2xl" />,
                  last4: "4895",
                },
                {
                  method: "cash",
                  label: "Cash on Delivery",
                  icon: <FaMoneyBillAlt className="text-green-600 text-2xl" />,
                  last4: "",
                },
              ].map(({ method, label, icon, last4 }) => (
                <div
                  key={method}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPayment === method
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedPayment(method)}
                >
                  <div className="flex items-center gap-4">
                    <span>{icon}</span>
                    <p className="font-medium">
                      {label} {last4 && `•••• ${last4}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
