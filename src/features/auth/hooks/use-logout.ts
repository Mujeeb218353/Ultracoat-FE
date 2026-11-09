import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authApi from "../api/auth.api";
import useAlert from "@/features/alert/hooks/use-alert";
import useRemoveDevice from "@/features/notification/hooks/use-remove-device";
import { useClearAuth } from "../selectors/auth.selector";


const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useClearAuth();
  const { success, error } = useAlert();
  const { mutateAsync: removeDevice } = useRemoveDevice();

  return useMutation({
    // Remove the device while the access token is still valid
    mutationFn: async () => {
      await removeDevice().catch(() => {});
      return authApi.logout();
    },
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      success("Logged out successfully!");
      router.push("/auth/login");
    },
    onError: (err) => {
      error(err, "Failed to logout. Please try again later.");
    }
  });
}

export default useLogout;