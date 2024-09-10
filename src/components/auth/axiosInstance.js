import axios from "axios";

const axiosObject = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // This ensures cookies are sent across domains if needed
});

// Add a request interceptor to include the token in headers
axiosObject.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export default axiosObject;
