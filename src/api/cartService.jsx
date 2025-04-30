import { client } from "./client";

// Get all cart items
export const getCartItems = async ({ userId }) => {
    if (!userId) {
        console.error("User ID is required");
        return;
    }
    try {
        const response = await client.get(`/cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error;
    }
};

// Add new item to cart
export const addToCart = async ({ item, userId }) => {
    if (!userId) {
        console.error("User ID is required");
        return;
    }
    try {
        const response = await client.post("/cart", { ...item, userId });
        return response.data;
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
};

// Update existing item in cart
export const updateCartItem = async (itemId, updatedItem) => {
    try {
        const response = await client.put(`/cart/${itemId}`, updatedItem);
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error);
        throw error;
    }
};

// Delete item from cart
export const deleteCartItem = async (itemId) => {
    try {
        const response = await client.delete(`/cart/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting cart item:", error);
        throw error;
    }
};
