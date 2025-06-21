import axios from "axios";
import { store } from "../store/store";
import { LoginSuccess, logout } from "../../../common/middleware/authApp";

const API_URL_BASE = "http://localhost:7777/";

export const Request = axios.create({
  baseURL: API_URL_BASE,
});

export const axiosInstance = axios.create({
  baseURL: API_URL_BASE,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    store.getState().auth.user?.accessToken;
  if (token) {
    config.headers["token"] = `Bearer ${token}`;
  }
  console.log("token + " + token);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // nếu token hết hạn thì là true để tránh vòng lặp vô hạn
      console.log("⚠️ Token lỗi rồi, đang refresh token...");
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("Không tìm thấy refresh token");
        const res = await axios.post(`${API_URL_BASE}user/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        const user = store.getState().auth.user;

        if (user) {
          store.dispatch(
            LoginSuccess({
              success: true,
              message: "Token refreshed",
              accessToken: newAccessToken,
              data: { ...user, accessToken: newAccessToken },
              refreshToken: "",
            })
          );

          localStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers["token"] = `Bearer ${newAccessToken}`;

          console.log("✅ Refresh thành công, đang gửi lại request...");
          
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    console.log("token khongo cos");
    return Promise.reject(error);
  }
);
