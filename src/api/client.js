import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7286/",
  //baseURL: "https://greenland.runasp.net",

  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ✅ interceptor لإضافة التوكن في كل طلب
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global Error Handling
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("API Request Error:", error);

    return Promise.reject(error);
  }
);
const client = axios.create({
  baseURL: "https://localhost:7286/",
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
// const notiClient = axios.create({
//     // baseURL: "https://localhost:7286.net/",
//     baseURL: "https://greenland.runasp.net/api",

//     timeout: 10000,
//     withCredentials: true,
//     headers: { "Content-Type": "application/json" },
// });

// client.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         console.error("API Request Error:", error);

//         return Promise.reject(error);
//     }
// );

export { client };
// export { notiClient };
export default axiosClient;
