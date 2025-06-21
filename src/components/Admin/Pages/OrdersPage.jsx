import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeProvider";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const usersRes = await axios.get(
        "https://greenland.runasp.net/me/GetAll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const users = usersRes.data.value;

      if (!Array.isArray(users)) {
        toast.error("Unexpected users format");
        return;
      }

      const allOrders = [];

      for (const user of users) {
        const res = await axios.get(
          `https://greenland.runasp.net/order/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // بعض الـ API بيرجع Array مباشرة بدون .data
        const userOrders = Array.isArray(res.data) ? res.data : res;

        // فلترة الطلبات المدفوعة فقط (كاش، فيزا، كريدت كارد)
        const paidOrders = userOrders.filter(
          (order) =>
            order.paymentMethod?.toLowerCase() === "cash" ||
            order.paymentMethod?.toLowerCase() === "visa" ||
            order.paymentMethod?.toLowerCase() === "creditcard"
        );

        // ضيف معلومات اليوزر
        paidOrders.forEach((order) => {
          order.userName = user.userName;
          order.userEmail = user.email;
        });

        allOrders.push(...paidOrders);
      }

      setOrders(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    }
  };

  return (
    <div
      className={`p-6 rounded-lg shadow transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">All Paid Orders</h2>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b dark:border-gray-700">
            <th className="py-2">Order ID</th>
            <th className="py-2">User</th>
            <th className="py-2">Email</th>
            <th className="py-2">Plant</th>
            <th className="py-2">Total</th>
            <th className="py-2">Payment</th>
            <th className="py-2">Address</th>
            <th className="py-2">Order Date</th>
            <th className="py-2">Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.orderId}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="py-2">{order.orderId}</td>
              <td className="py-2">{order.userName}</td>
              <td className="py-2">{order.userEmail}</td>
              <td className="py-2">{order.plantName || "-"}</td>
              <td className="py-2">${order.totalAmount.toFixed(2)}</td>
              <td className="py-2">{order.paymentMethod}</td>
              <td className="py-2">{order.address}</td>
              <td className="py-2">
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleDateString()
                  : "-"}
              </td>
              <td className="py-2">{order.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
