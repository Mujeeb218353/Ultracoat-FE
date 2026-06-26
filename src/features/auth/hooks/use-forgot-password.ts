import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { ForgotPasswordRequest } from "../types/auth.types";
import useAlert from "@/features/alert/hooks/use-alert";
import getErrorMessage from "@/lib/api/error";
import { useRouter } from "next/navigation";

const useForgotPassword = () => {
  const router = useRouter();
  const { success, error } = useAlert();
  
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) => authApi.forgotPassword(payload),
    onSuccess: (_, data) => {
      success("Password reset email sent successfully. Please check your inbox.");
      sessionStorage.setItem("otp_flow_email", data.email);
      sessionStorage.setItem("otp_sent_at", Date.now().toString());
      router.push(`/auth/reset-password?email=${encodeURIComponent(data.email)}`);
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to send password reset email. Please try again later."));
    },
  });
};

export default useForgotPassword;