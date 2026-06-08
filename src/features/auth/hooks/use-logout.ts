import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import useAuthStore from "../store/auth.store";
import useNotify from "@/features/alert/hooks/use-notify";
import getErrorMessage from "@/lib/api/error";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { success, error } = useNotify();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      router.push("/auth/login");
      success("Logged out successfully!");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to logout. Please try again later."));
    }
  });
}

export default useLogout;