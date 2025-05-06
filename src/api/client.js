import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7286/",
   // baseURL: "https://greenland.runasp.net",

    timeout: 10000,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

// Global Error Handling
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error("API Request Error:", error);

        return Promise.reject(error);
    }
);
const client = axios.create({
    baseURL: "https://localhost:7286.net/",
    // baseURL: "https://greenland.runasp.net/",

    timeout: 10000,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error("API Request Error:", error);

        return Promise.reject(error);
    }
);
export { client };
export default axiosClient;
