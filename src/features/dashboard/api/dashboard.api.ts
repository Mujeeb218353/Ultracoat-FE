import api from "@/lib/api/axios";
import { ApiResponse } from "@/utils/types";
import dashboardEndpoints from "../constants/dashboard.endpoints";
import { Dashboard } from "../types/dashboard.types";

const dashboardApi = {
  getAdminDashboard: () => api.get<ApiResponse<Dashboard>>(dashboardEndpoints.admin.dashboard).then((res) => res.data.data),
};

export default dashboardApi;