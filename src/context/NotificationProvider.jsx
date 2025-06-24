// src/context/NotificationProvider.jsx
import { createContext, useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useProfile } from "@/hooks/authService";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { data: currentUser } = useProfile();

  useEffect(() => {
    if (!currentUser?.id) return;

    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7286/hubs/notification", {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("✅ SignalR Connected"))
      .catch((err) => console.error("❌ SignalR Error:", err));

    connection.on("ReceiveNotification", (message) => {
      const newNotification =
        typeof message === "string" ? { message } : message;

      // ✅ Don't push notification if it's from yourself
      const sender = newNotification.commenterName || newNotification.userName;
      if (sender === currentUser?.userName) return;

      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => {
      connection.stop();
    };
  }, [currentUser]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}
