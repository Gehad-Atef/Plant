// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7286",
    withCredentials: true,
});

export default axiosInstance;
