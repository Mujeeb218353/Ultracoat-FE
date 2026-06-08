import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import useNotify from "@/features/alert/hooks/use-notify";
import getErrorMessage from "@/lib/api/error";

const useSendVerificationEmail = () => {
  const { success, error } = useNotify();
  return useMutation({
    mutationFn: () => authApi.sendVerificationEmail(),
    onSuccess: () => {
      success("Verification email sent successfully!");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to send verification email. Please try again later."));
    }
  });
}

export default useSendVerificationEmail;