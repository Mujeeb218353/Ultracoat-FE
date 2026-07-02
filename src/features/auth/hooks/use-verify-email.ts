import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import {  VerifyEmailRequest } from "../types/auth.types";
import useAlert from "@/features/alert/hooks/use-alert";
import getErrorMessage from "@/lib/api/error";
import { usePatchUser } from "../selectors/auth.selector";

const useVerifyEmail = () => {
  const patchUser = usePatchUser();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: VerifyEmailRequest) => authApi.verifyEmail(payload),
    onSuccess: () => {
      patchUser({ isVerified: true });
      success("Email verified successfully!");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to verify email. Please try again later."));
    }
  });
};

export default useVerifyEmail;