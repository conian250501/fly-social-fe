import { PATHS } from "@/contanst/paths";
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // window.location = PATHS.LoginPage as any;
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
