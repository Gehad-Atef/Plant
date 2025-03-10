import { useState } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaMoneyBillAlt,
  FaPlus,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const PaymentMethods = () => {
  const { darkMode } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();

  const handleConfirmPayment = () => {
    if (selectedPayment) {
      alert(`Payment confirmed with ${selectedPayment}`);
      navigate("/");
    } else {
      alert("Please select a payment method!");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center  py-20 px-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-green-200 to-white text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-lg shadow-lg rounded-xl p-6 transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Payment Methods</h2>
        <button className="flex items-center gap-2 text-green-600 text-sm font-medium mb-4">
          <FaPlus className="text-sm" /> Add Payment Card
        </button>

        <div className="grid grid-cols-1 gap-3">
          {[
            {
              method: "visa",
              label: "Visa Debit Card",
              icon: <FaCcVisa className="text-blue-800 text-xl" />,
              last4: "5212",
            },
            {
              method: "mastercard",
              label: "MasterCard",
              icon: <FaCcMastercard className="text-red-500 text-xl" />,
              last4: "8423",
            },
            {
              method: "paypal",
              label: "PayPal",
              icon: <FaPaypal className="text-blue-500 text-xl" />,
              last4: "4895",
            },
            {
              method: "cash",
              label: "Cash on Delivery",
              icon: <FaMoneyBillAlt className="text-green-600 text-xl" />,
              last4: "",
            },
          ].map(({ method, label, icon, last4 }) => (
            <div
              key={method}
              className={`flex items-center justify-between w-full p-3 rounded-lg border cursor-pointer transition-all text-sm ${
                selectedPayment === method
                  ? "border-green-500 bg-green-300"
                  : darkMode
                  ? "border-gray-700 bg-gray-700 hover:border-green-300 hover:bg-gray-600"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-300"
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

        <button
          onClick={handleConfirmPayment}
          className="mt-5 w-full bg-green-500 text-white py-2 rounded-lg font-bold text-sm transition-all hover:bg-green-600"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
