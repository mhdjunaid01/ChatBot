import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/", 
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; 
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
