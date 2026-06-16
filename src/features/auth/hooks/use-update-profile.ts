import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import useAuthStore from "../store/auth.store";
import { UpdateProfileRequest } from "../types/auth.types";
import useAlert from "@/features/alert/hooks/use-alert";
import getErrorMessage from "@/lib/api/error";

const useUpdateProfile = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: UpdateProfileRequest) => authApi.updateProfile(payload),
    onSuccess: (user) => {
      setUser(user);
      success("Profile updated successfully!");
    },
    onError: (err) => {
      error(getErrorMessage(err, "Failed to update profile. Please try again later."));
    }
  });
};

export default useUpdateProfile;