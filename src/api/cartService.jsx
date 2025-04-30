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
export const addToCart = async ({ userId, plantId, plantName, quantity }) => {
    if (!userId) {
        console.error("User ID is required");
        return;
    }
    try {
        const response = await client.post("/cart", {
            userId,
            plantId,
            plantName,
            quantity,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
};

// Update existing item in cart
export const updateCartItem = async ({ cartId, quantity }) => {
    try {
        const response = await client.post("/cart", { cartId, quantity });
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

// Clear all items from cart
export const clearCart = async (cartId) => {
    try {
        const response = await client.delete(`/cart/${cartId}`);
        return response.data;
    } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
    }
};
