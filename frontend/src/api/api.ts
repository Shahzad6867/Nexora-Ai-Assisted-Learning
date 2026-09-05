import axios from "axios";
import store from "../app/store";
import { setToken } from "../features/authSlice";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store?.getState().auth.token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response);
    if (
      error.response?.data?.statusCode === 401 &&
      (error.response?.data?.error === "ACCESS_TOKEN_EXPIRED" ||
        error.response?.data?.error === "ACCESS_TOKEN_NOT_FOUND") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "http://localhost:5000/api/refresh",
          {},
          { withCredentials: true }
        );
        store.dispatch(setToken(response.data));
        originalRequest.headers.Authorization = `Bearer ${response.data.data}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch({ type: "auth/logout" });
        return Promise.reject(refreshError);
      }
    }
  }
);

export default api;
