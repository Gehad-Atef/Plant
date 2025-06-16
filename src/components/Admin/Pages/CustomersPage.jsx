import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeProvider";
import toast from "react-hot-toast";

export default function CustomersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("authToken");

    axios
      .get("https://localhost:7286/me/GetAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data.value)) {
          setUsers(res.data.value);
        } else {
          console.error("Unexpected data format:", res.data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found.");
      return;
    }

    Promise.all(
      selectedUsers.map((id) =>
        axios.delete(`https://localhost:7286/me/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    )
      .then(() => {
        toast.success("Users deleted successfully");
        setSelectedUsers([]);
        fetchUsers();
      })
      .catch((err) => {
        console.error("Deletion error:", err);
        toast.error("Failed to delete some users");
      });
  };

  return (
    <div
      className={`p-6 rounded-lg shadow transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">All Customers</h2>
        <div className="space-x-2">
          {/* <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
            Add
          </button> */}
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition disabled:opacity-50"
            disabled={selectedUsers.length === 0}
          >
            Delete Selected
          </button>
        </div>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b dark:border-gray-700">
            <th className="py-2"></th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            {/* <th className="py-2">Country</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="py-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td className="py-2">{user.userName}</td>
              <td className="py-2">{user.email}</td>
              {/* <td className="py-2">{user.id || "-"}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
