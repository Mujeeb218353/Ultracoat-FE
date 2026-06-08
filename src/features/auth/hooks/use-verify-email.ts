import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import useAuthStore from "../store/auth.store";
import {  VerifyEmailRequest } from "../types/auth.types";
import useNotify from "@/features/alert/hooks/use-notify";
import getErrorMessage from "@/lib/api/error";

const useVerifyEmail = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const { success, error } = useNotify();

  return useMutation({
    mutationFn: (payload: VerifyEmailRequest) => authApi.verifyEmail(payload),
    onSuccess: (user) => {
      setUser(user);
      success("Email verified successfully!");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to verify email. Please try again later."));
    }
  });
};

export default useVerifyEmail;