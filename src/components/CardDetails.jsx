import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeProvider";

const CardDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedPayment } = state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const { darkMode } = useTheme();

  const handleSubmit = async () => {
    if (!cardNumber || !expirationDate || !cvv) {
      alert("Please fill in all card details.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    // استخدم Object.create للحفاظ على casing الصحيح
    const cardDetails = Object.create(null);
    cardDetails.CardNumber = cardNumber;
    cardDetails.ExpirationDate = expirationDate;
    cardDetails.CVV = cvv;
    cardDetails.CardType = selectedPayment;

    const payload = {
      userId: user?.id,
      paymentMethod: selectedPayment,
      address: "Cairo, Egypt",
      cardDetails,
    };

    console.log("🚀 Sending payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(
        "https://greenland.runasp.net/payment/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("❌ Invalid JSON from server:", text);
        alert("🚨 Server error: Invalid response format.");
        return;
      }

      if (response.ok && data.success) {
        alert("✅ Payment Successful!");
        navigate("/success");
      } else {
        console.error("❌ Backend error:", data);
        alert(data?.message || "❌ Payment failed. Try again.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("🚨 Something went wrong. Please check the connection.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-10 px-6 transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-lg transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Enter Card Details ({selectedPayment})
        </h2>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className={`w-full border p-2 mb-3 rounded ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-black"
          }`}
        />
        <input
          type="text"
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className={`w-full border p-2 mb-3 rounded ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-black"
          }`}
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className={`w-full border p-2 mb-3 rounded ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-black"
          }`}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default CardDetails;