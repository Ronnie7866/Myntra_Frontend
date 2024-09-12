import axios from "axios";

// Create a single Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Base URL for the API
  headers: {
    "Content-Type": "application/json", // Default header for FormData
  },
  withCredentials: true, // Ensures cookies are sent across domains if needed
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
