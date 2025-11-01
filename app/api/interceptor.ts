// creating a file for the interceptors

// importing the required modules
import axios from "axios";
import toast from "react-hot-toast";

// creating the api
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// request interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    toast.error("Request error ❌");
    return Promise.reject(error);
  }
);

// response interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message) {
      const status = error.response.status;

      if (status === 401)
        return toast.error("Unauthorized - Please login again");
      if (status === 500) {
        return toast.error("Server busy");
      } else toast.error(error.response.data.message || "Something went wrong");
    } else {
      toast.error("Network error — Check your connection");
    }

    return Promise.reject(error);
  }
);

export default api;
