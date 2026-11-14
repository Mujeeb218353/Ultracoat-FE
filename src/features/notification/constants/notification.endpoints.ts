const baseUrl = "/notifications";

const notificationsEndpoints = {
  getNotifications: baseUrl,
  markAllAsRead: `${baseUrl}/read-all`,
  markAsRead: (id: string) => `${baseUrl}/read/${encodeURIComponent(id)}`,
  registerDevice: `${baseUrl}/devices`,
  removeDevice: `${baseUrl}/devices`,
} as const;

export default notificationsEndpoints;