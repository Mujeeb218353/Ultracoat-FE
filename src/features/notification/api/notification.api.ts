import api from "@/lib/api/axios";
import notificationsEndpoints from "../constants/notification.endpoints";
import { Notification } from "../types/notification.types";

const notificationsApi = {
  registerDevice: (payload: Notification) => api.post(notificationsEndpoints.registerDevice, payload),
  removeDevice: (payload: Notification) => api.delete(notificationsEndpoints.removeDevice, { data: payload }),
};

export default notificationsApi;
