import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { ResetPasswordRequest } from "../types/auth.types";
import useAlert from "@/features/alert/hooks/use-alert";
import getErrorMessage from "@/lib/api/error";

const useResetPassword = () => {
  const router = useRouter();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) => authApi.resetPassword(payload),
    onSuccess: () => {
      success("Password reset successfully!");
      router.push("/auth/login");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to reset password. Please try again later."));
    }
  });
};

export default useResetPassword;