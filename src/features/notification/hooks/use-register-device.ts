import {
  getDeviceToken,
  storeDeviceToken
} from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import notificationsApi from "../api/notification.api";
import { Notification } from "../types/notification.types";
// import { getDeviceToken, storeDeviceToken } from "../utils/device-token";

const useRegisterDevice = () =>
  useMutation({
    onError: (err) => console.error("[device] register failed", err),
    mutationFn: async () => {
      const token = await getDeviceToken();
      if (!token) return null;
      const payload: Notification = { token, platform: "web" };
      await notificationsApi.registerDevice(payload);
      storeDeviceToken(token);
      return token;
    },
  });

export default useRegisterDevice;