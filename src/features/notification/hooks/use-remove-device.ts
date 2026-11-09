import {
  clearStoredDeviceToken,
  getStoredDeviceToken
} from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import notificationsApi from "../api/notification.api";
// import { clearStoredDeviceToken, getStoredDeviceToken } from "../utils/device-token";

const useRemoveDevice = () =>
  useMutation({
    mutationFn: async () => {
      const token = getStoredDeviceToken();
      if (!token) return;
      try {
        await notificationsApi.removeDevice({ token, platform: "web" });
      } finally {
        clearStoredDeviceToken();
      }
    },
  });

export default useRemoveDevice;