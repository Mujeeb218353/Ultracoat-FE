import { AxiosError } from "axios";

export interface ApiErrorPayload {
  statusCode: number;
  message: string;
  data: unknown | null;
};

const getErrorMessage = (error: unknown, fallback = "Something went wrong"): string => {
  if (error instanceof AxiosError) {
    const payload = error.response?.data as ApiErrorPayload | undefined;
    if (payload?.message) return payload.message;

    if (error.code === "ECONNABORTED") return "Request timed out. Try again.";
    if (error.message === "Network Error") return "No internet connection.";

    if (error.response?.status === 403) return "You don't have permission to do this.";
    if (error.response?.status === 404) return "Requested resource not found.";
    if (error.response?.status && error.response.status >= 500)
      return "Server error. Please try again later.";
  }

  if (error instanceof Error) return error.message;

  return fallback;
};

export function getErrorStatusCode(error: unknown): number | null {
  if (error instanceof AxiosError) {
    const payload = error.response?.data as ApiErrorPayload | undefined;
    return payload?.statusCode ?? error.response?.status ?? null;
  }
  return null;
};

export function getErrorData<T = unknown>(error: unknown): T | null {
  if (error instanceof AxiosError) {
    const payload = error.response?.data as ApiErrorPayload | undefined;
    return (payload?.data as T) ?? null;
  }
  return null;
};

export default getErrorMessage;