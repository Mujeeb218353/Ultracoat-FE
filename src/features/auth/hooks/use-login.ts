import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import useAuthStore from "../store/auth.store";
import { LoginRequest } from "../types/auth.types";
import useNotify from "@/features/alert/hooks/use-notify";
import getErrorMessage from "@/lib/api/error";

const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setTokens = useAuthStore((s) => s.setTokens);
  const { success, error } = useNotify();

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