import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeProvider";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
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

        const userOrders = Array.isArray(res.data) ? res.data : res;

        const paidOrders = userOrders.filter(
          (order) =>
            order.paymentMethod?.toLowerCase() === "cash" ||
            order.paymentMethod?.toLowerCase() === "visa" ||
            order.paymentMethod?.toLowerCase() === "creditcard"
        );

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

  const handleOrderCheckboxChange = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleDeleteSelectedOrders = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await Promise.all(
        selectedOrders.map((id) =>
          axios.delete(`https://greenland.runasp.net/order/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      toast.success("Orders deleted successfully");
      setSelectedOrders([]);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting orders:", err);
      toast.error("Failed to delete some orders");
    }
  };

  return (
    <div
      className={`p-6 rounded-lg shadow transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">All Paid Orders</h2>
        <button
          onClick={handleDeleteSelectedOrders}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition disabled:opacity-50"
          disabled={selectedOrders.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b dark:border-gray-700">
            <th className="py-2"></th>
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
              <td className="py-2">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.orderId)}
                  onChange={() => handleOrderCheckboxChange(order.orderId)}
                />
              </td>
              <td className="py-2">{order.orderId}</td>
              <td className="py-2">{order.userName}</td>
              <td className="py-2">{order.userEmail}</td>
              <td className="py-2">{order.plantName || "-"}</td>
              <td className="py-2">${order.totalAmount?.toFixed(2) || "-"}</td>
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
