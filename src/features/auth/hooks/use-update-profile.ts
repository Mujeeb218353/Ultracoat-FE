import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { UpdateProfileRequest } from "../types/auth.types";
import useAlert from "@/features/alert/hooks/use-alert";
import getErrorMessage from "@/lib/api/error";
import { useSetUser } from "../selectors/auth.selector";

const useUpdateProfile = () => {
  const setUser = useSetUser();
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