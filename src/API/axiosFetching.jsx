import axios from "axios";
import Cookies from "js-cookie";

const axiosFetching = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // ✅ يتيح إرسال الـ Cookies مع الطلب
});

axiosFetching.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
  }
);

export default axiosFetching;
