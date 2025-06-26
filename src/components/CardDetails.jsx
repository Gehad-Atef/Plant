import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeProvider";

const CardDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedPayment } = state || {};
  const { darkMode } = useTheme();

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  // ✅ تطبيع نوع الدفع
  const normalizedPaymentMethod =
    selectedPayment?.toLowerCase() === "visa"
      ? "Visa"
      : selectedPayment?.toLowerCase() === "creditcard"
      ? "CreditCard"
      : null; // لو مش Visa أو CreditCard → null

  // ❌ لو طريقة غير مدعومة → نرجع خطوة للخلف
  useEffect(() => {
    if (!normalizedPaymentMethod) {
      alert("❌ Only Visa or CreditCard are supported.");
      navigate(-1);
    }
  }, [normalizedPaymentMethod, navigate]);

  const handleSubmit = async () => {
    if (!cardNumber || !expirationDate || !cvv) {
      alert("Please fill in all card details.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const cardDetails = {
      CardNumber: cardNumber,
      ExpirationDate: expirationDate,
      CVV: cvv,
      CardType: normalizedPaymentMethod,
    };

    const payload = {
      userId: user?.id,
      paymentMethod: normalizedPaymentMethod,
      address: "Cairo, Egypt",
      cardDetails,
    };

    console.log("🔍 Sending payload:", payload);

    try {
      const response = await fetch("https://localhost:7286/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 204) {
        alert("✅ Payment Successful!");
        navigate("/success");
      } else {
        const text = await response.text();
        let errorData = {};
        try {
          errorData = JSON.parse(text);
        } catch (err) {
          console.error("Invalid error JSON:", text);
        }

        console.error("❌ Payment failed:", errorData);
        alert(
          errorData?.errors?.[0]?.discription ||
            errorData?.message ||
            "❌ Payment failed. Try again."
        );
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
          Enter Card Details ({normalizedPaymentMethod})
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
