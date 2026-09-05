import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authApi from "../api/auth.api";
import { useSetUser, useSetIsAuthenticated } from "../selectors/auth.selector";
import { LoginRequest } from "../types/auth.types";
import useAlert from "@/features/alert/hooks/use-alert";
import { resetAbortController } from "@/utils/abort-controller";

const useLogin = () => {
  const router = useRouter();
  const setUser = useSetUser();
  const setIsAuthenticated = useSetIsAuthenticated();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (data) => {
      if(data.user.role !== "ADMIN"){
        error("Access denied. You do not have permission to access this application.");
        return;
      }
      resetAbortController();
      success("Login successful!");
      setIsAuthenticated(data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push("/dashboard");
      router.refresh();
    },
    onError: (err) => {
      error(err, "Failed to login. Please check your credentials and try again.");
    },
  });
};

export default useLogin;