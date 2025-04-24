import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7286/api", // Replace with your API base URL
    withCredentials: true, // Include credentials (cookies) in requests
});

// Fetch all posts
export const getPosts = async (page = 1) => {
    try {
        const response = await api.get(`/Posts?pageNumber=${page}`);
        return response.data; // Return the full response data
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

// Create a new post
export const createPost = async (postData) => {
    try {
        const response = await api.post("/Posts", postData, {
            headers: { "Content-Type": "multipart/form-data" }, // For image uploads
        });
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

// Fetch a specific post by ID
export const getPostById = async (postId) => {
    try {
        const response = await api.get(`/Posts/${postId}`);
        return response.data.value;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
};

// Fetch comments for a specific post
export const getCommentsByPost = async (postId) => {
    try {
        const response = await api.get(`/Comment/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

// Add a comment to a post
export const addComment = async (commentData) => {
    try {
        const response = await api.post("/Comment", commentData);
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

// Delete a comment
export const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`/Comment/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};