import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { ForgotPasswordRequest } from "../types/auth.types";
import useNotify from "@/features/alert/hooks/use-notify";
import getErrorMessage from "@/lib/api/error";

const useForgotPassword = () => {
  const { success, error } = useNotify();
  
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) => authApi.forgotPassword(payload),
    onSuccess: () => {
      success("Password reset email sent successfully. Please check your inbox.");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to send password reset email. Please try again later."));
    },
  });
};

export default useForgotPassword;