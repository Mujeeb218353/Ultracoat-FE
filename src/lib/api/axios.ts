import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import useAuthStore from "@/features/auth/store/auth.store";
import authEndpoints from "@/features/auth/constants/auth.endpoints";
import { AuthTokens } from "@/features/auth/types/auth.types";
import { ApiResponse } from "@/utils/types";
import { redirect } from "next/navigation";

const baseURL = '/api/v1';

const authOnlyEndpoints: string[] = [
  authEndpoints.login,
  authEndpoints.refreshToken,
  authEndpoints.forgotPassword,
  authEndpoints.resetPassword,
];

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  withCredentials: true,
  headers: { 
    "Content-Type": "application/json" 
  },
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

function processQueue(error: unknown | null, token: string | null = null): void {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token as string);
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const isAuthEndpoint = authOnlyEndpoints.some((url) =>
      originalRequest.url?.includes(url),
    );

    if (
      error.response?.status === 401 &&
      !isAuthEndpoint &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post<ApiResponse<AuthTokens>>(
          `${baseURL}${authEndpoints.refreshToken}`,
          null,
          {
            withCredentials: true,
          },
        );

        const { accessToken, refreshToken: newRefreshToken } = res.data.data;
        useAuthStore.getState().setIsAuthenticated(accessToken, newRefreshToken);

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        processQueue(refreshError, null);

        if (typeof window !== "undefined") {
          redirect("/auth/login");
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;