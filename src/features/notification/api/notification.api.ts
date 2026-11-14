import api from "@/lib/api/axios";
import { ApiResponse } from "@/utils/types";
import notificationsEndpoints from "../constants/notification.endpoints";
import { Notification, NotificationsResponse } from "../types/notification.types";

const notificationsApi = {
  getNotifications: (params: { skip: number; limit: number }) => api.get<ApiResponse<NotificationsResponse>>(notificationsEndpoints.getNotifications, { params }).then((res) => res.data.data),
  markAsRead: (id: string) =>api.put<ApiResponse<null>>(notificationsEndpoints.markAsRead(id)).then((res) => res.data.data),
  markAllAsRead: () =>api.put<ApiResponse<{ updatedCount: number }>>(notificationsEndpoints.markAllAsRead).then((res) => res.data.data),
  registerDevice: (payload: Notification) => api.post(notificationsEndpoints.registerDevice, payload),
  removeDevice: (payload: Notification) => api.delete(notificationsEndpoints.removeDevice, { data: payload }),
};

export default notificationsApi;