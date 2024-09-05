import axios from "axios";

// Create an Axios instance with default settings
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Base URL for the API
  headers: {
    "Content-Type": "application/json", // Default header for FormData
  },
});
