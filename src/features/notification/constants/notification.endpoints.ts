const baseUrl = "/notifications";

const notificationsEndpoints = {
  registerDevice: `${baseUrl}/devices`,
  removeDevice: `${baseUrl}/devices`,
} as const;

export default notificationsEndpoints;