import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import useAlert from "@/features/alert/hooks/use-alert";
import getErrorMessage from "@/lib/api/error";

const useSendVerificationEmail = () => {
  const { success, error } = useAlert();
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