import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import { UpdatePasswordRequest } from "../types/auth.types";
import useAlert from "@/features/alert/hooks/use-alert";

const useUpdatePassword = () => {
  const { success, error } = useAlert();
  return useMutation({
    mutationFn: (payload: UpdatePasswordRequest) => authApi.updatePassword(payload),
    onSuccess: () => {
      success("Password updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update password. Please try again later.");
    }
  });
}

export default useUpdatePassword;