import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { UpdatePasswordRequest } from "../types/auth.types";
import useNotify from "@/features/alert/hooks/use-notify";
import getErrorMessage from "@/lib/api/error";

const useUpdatePassword = () => {
  const { success, error } = useNotify();
  return useMutation({
    mutationFn: (payload: UpdatePasswordRequest) => authApi.updatePassword(payload),
    onSuccess: () => {
      success("Password updated successfully!");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to update password. Please try again later."));
    }
  });
}

export default useUpdatePassword;