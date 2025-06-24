import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  startNotificationHub,
  stopNotificationHub,
} from "../signalR/notificationHub";
import useNotificationQuery from "@/hooks/useNotificationQuery";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [realtimeNotifications, setRealtimeNotifications] = useState([]);
  const { notifications: storedNotifications, refetch } =
    useNotificationQuery();

  useEffect(() => {
    const handleNewNotification = (message) => {
      setRealtimeNotifications((prev) => [...prev, message]);
      toast(message);

      // Optionally refetch stored notifications list
      refetch();
    };

    startNotificationHub(handleNewNotification);
    return () => stopNotificationHub();
  }, [refetch]);

  return (
    <NotificationContext.Provider
      value={{
        notifications: [
          ...(storedNotifications || []),
          ...realtimeNotifications,
        ],
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
