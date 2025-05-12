import { client } from "./client";

// Get notifications by userId
export const getNotifications = async ({ userId }) => {
    if (!userId) {
        console.error("User ID is required");
        return;
    }

    try {
        const response = await client.get(`api/Notification`, {
            params: { userId },
        });
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};
