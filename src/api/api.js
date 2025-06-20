
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://localhost:7286',
    withCredentials: true,
});

export const getPosts = () => API.get('/api/posts');
export const getMyPosts = () => API.get('/me/Posts');
export const createPost = (data) =>
    API.post('/api/posts', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const reactToPost = (postId, type) => API.post(`/api/posts/${postId}/react/${type}`);
export const getComments = (postId) => API.get(`/api/posts/${postId}/comments`);
export const createComment = (postId, data) => API.post(`/api/posts/${postId}/comments`, data);
export const deleteComment = (commentId) => API.delete(`/api/comments/${commentId}`);
export const deletePost = (postId) => API.delete(`/api/posts/${postId}`);
