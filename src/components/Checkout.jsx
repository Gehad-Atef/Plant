import { useState } from "react";
import {
    FaCcVisa,
    FaCcMastercard,
    FaPaypal,
    FaMoneyBillAlt,
    FaPlus,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";

const PaymentMethods = () => {
    const { darkMode } = useTheme();
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleConfirmPayment = async () => {
        if (!selectedPayment) {
            alert("Please select a payment method!");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        const address = "Cairo, Egypt";

        const payload = {
            userId,
            paymentMethod: selectedPayment,
            address,
            cardDetails:
                selectedPayment === "cash"
                    ? null
                    : {
                          cardNumber: "4111111111111111",
                          expirationDate: "12/25",
                          cvv: "123",
                          cardType: selectedPayment,
                      },
        };

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

            const data = await response.json();

            if (response.ok && data.success) {
                setPaymentSuccess(true);
            } else {
                alert("❌ Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("🚨 Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-6">
            {paymentSuccess ? (
                <div className="text-center bg-green-100 p-10 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-green-700 mb-4">
                        ✅ Payment Successful!
                    </h1>
                    <p className="text-green-700">
                        Thank you for your purchase.
                    </p>
                </div>
            ) : (
                <div
                    className={`w-full max-w-lg shadow-lg rounded-xl p-6 transition-all ${
                        darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-900"
                    }`}
                >
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Payment Methods
                    </h2>

                    <button className="flex items-center gap-2 text-green-600 text-sm font-medium mb-4">
                        <FaPlus className="text-sm" /> Add Payment Card
                    </button>

                    <div className="grid grid-cols-1 gap-3">
                        {[
                            {
                                method: "visa",
                                label: "Visa Debit Card",
                                icon: (
                                    <FaCcVisa className="text-blue-800 text-xl" />
                                ),
                                last4: "5212",
                            },
                            {
                                method: "mastercard",
                                label: "MasterCard",
                                icon: (
                                    <FaCcMastercard className="text-red-500 text-xl" />
                                ),
                                last4: "8423",
                            },
                            {
                                method: "paypal",
                                label: "PayPal",
                                icon: (
                                    <FaPaypal className="text-blue-500 text-xl" />
                                ),
                                last4: "4895",
                            },
                            {
                                method: "cash",
                                label: "Cash on Delivery",
                                icon: (
                                    <FaMoneyBillAlt className="text-green-600 text-xl" />
                                ),
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
            )}
        </div>
    );
};

export default PaymentMethods;
