import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import useAlert from "@/features/alert/hooks/use-alert";
import getErrorMessage from "@/lib/api/error";
import { useClearAuth } from "../selectors/auth.selector";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useClearAuth();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      success("Logged out successfully!");
      router.push("/auth/login");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to logout. Please try again later."));
    }
  });
}

export default useLogout;