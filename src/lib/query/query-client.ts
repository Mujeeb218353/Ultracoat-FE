import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: (count: number, error: Error) => !(error instanceof AxiosError && error?.response?.status === 401) && count < 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;