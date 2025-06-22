import { useState } from "react";
import { FaCcVisa, FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const PaymentMethods = () => {
  const { darkMode } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState("");

  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!selectedPayment) {
      alert("Please select a payment method!");
      return;
    }

    if (selectedPayment === "cash") {
      if (!address) {
        alert("Please enter your address for cash delivery.");
        return;
      }

      const payload = {
        userId: user?.id,
        paymentMethod: "Cash",
        address,
        cardDetails: null,
      };

      try {
        const response = await fetch(
          "https://localhost:7286/payment/checkout",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const text = await response.text();
        let data;

        if (response.status !== 204) {
          try {
            data = JSON.parse(text);
          } catch (error) {
            console.error("❌ Invalid JSON returned from server:", text);
            alert("🚨 Server returned invalid response.");
            return;
          }
        }

        if (response.ok && (data?.success || response.status === 204)) {
          setPaymentSuccess(true);
        } else {
          console.error("❌ Backend error:", data);
          alert(data?.message || "❌ Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Payment Error:", error);
        alert("🚨 Network error occurred. Try again.");
      }
    } else {
      navigate("/card-details", { state: { selectedPayment } });
    }
  };

  return (
    <div className="relative max-h-screen flex items-center justify-center py-10 px-6">
      {/* ✅ Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-center">
              Enter Your Address
            </h2>
            <input
              type="text"
              placeholder="Address for delivery"
              value={tempAddress}
              onChange={(e) => setTempAddress(e.target.value)}
              className={`w-full border p-2 rounded mb-4 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-black"
              }`}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!tempAddress.trim()) {
                    alert("Please enter your address.");
                    return;
                  }
                  setAddress(tempAddress);
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentSuccess ? (
        <div className="text-center bg-green-100 p-10 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            ✅ Payment Successful!
          </h1>
          <p className="text-green-700">Thank you for your purchase.</p>
        </div>
      ) : (
        <div
          className={`w-full max-w-lg shadow-lg rounded-xl p-6 transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Payment Methods
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {[
              {
                method: "visa",
                label: "Visa",
                icon: <FaCcVisa className="text-blue-800 text-xl" />,
              },
              {
                method: "creditcard",
                label: "Credit Card",
                icon: <FaCreditCard className="text-indigo-600 text-xl" />,
              },
              {
                method: "cash",
                label: "Cash on Delivery",
                icon: <FaMoneyBillAlt className="text-green-600 text-xl" />,
              },
            ].map(({ method, label, icon }) => (
              <div
                key={method}
                className={`flex items-center justify-between w-full p-3 rounded-lg border cursor-pointer transition-all text-sm ${
                  selectedPayment === method
                    ? "border-green-500 bg-green-300"
                    : darkMode
                    ? "border-gray-700 bg-gray-700 hover:border-green-300 hover:bg-gray-600"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-300"
                }`}
                onClick={() => {
                  setSelectedPayment(method);
                  if (method === "cash") {
                    setIsModalOpen(true);
                    setTempAddress(address); // prefill if already entered
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  <span>{icon}</span>
                  <p className="font-medium">{label}</p>
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
      )}
    </div>
  );
};

export default PaymentMethods;
