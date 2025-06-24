// src/signalr/notificationHub.js
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const hubUrl = "https://localhost:7286/notificationhub"; // Adjust your endpoint

let connection = null;

export const startNotificationHub = async (onNotificationReceived) => {
    connection = new HubConnectionBuilder()
        .withUrl(hubUrl, {
            withCredentials: true, // important if you're using cookies for auth
        })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    connection.on("ReceiveNotification", onNotificationReceived);

    try {
        await connection.start();
        console.log("SignalR connected to NotificationHub.");
    } catch (err) {
        console.error("SignalR Connection Error:", err);
    }
};

export const stopNotificationHub = async () => {
    if (connection) {
        await connection.stop();
        console.log("SignalR connection stopped.");
    }
};
