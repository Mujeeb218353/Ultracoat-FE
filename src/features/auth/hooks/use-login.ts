import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { useSetUser, useSetTokens } from "../selectors/auth.selector";
import { LoginRequest } from "../types/auth.types";
import useAlert from "@/features/alert/hooks/use-alert";
import getErrorMessage from "@/lib/api/error";

const useLogin = () => {
  const router = useRouter();
  const setUser = useSetUser();
  const setTokens = useSetTokens();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (data) => {
      if(data.user.role !== "ADMIN"){
        error("Access denied. You do not have permission to access this application.");
        return;
      }
      success("Login successful!");
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push("/dashboard");
      router.refresh();
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to login. Please check your credentials and try again."));
    },
  });
};

export default useLogin;