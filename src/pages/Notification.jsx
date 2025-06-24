import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useProfile } from "@/hooks/authService";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { data: currentUser } = useProfile();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/Notification", {
        withCredentials: true,
      });

      const all = res.data?.value || [];

      // ✅ Filter out self-notifications using commenterName
      const filtered = all.filter(
        (notif) => notif.commenterName !== currentUser?.userName
      );

      setNotifications(filtered);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put("/api/Notification/mark-all-read", null, {
        withCredentials: true,
      });
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark notifications as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentUser]);

  const handleClick = async (notif) => {
    if (notif.postId) {
      const res = await axios.get(`/api/Posts/${notif.postId}`);
      if (res.data?.isSuccess) {
        navigate(`/post/${notif.postId}`);
      } else {
        alert("Post no longer exists");
      }
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FaBell /> Notifications
        </h1>
        <button
          onClick={markAllAsRead}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Mark All as Read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
          No notifications found.
        </p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              onClick={() => handleClick(notif)}
              className={`cursor-pointer p-3 rounded-lg border ${
                notif.isRead
                  ? "bg-white dark:bg-gray-800"
                  : "bg-blue-50 dark:bg-blue-900"
              } hover:shadow`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={notif.imageUrl}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="User"
                />
                <div className="text-sm text-gray-800 dark:text-gray-100">
                  <p>{notif.message}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
