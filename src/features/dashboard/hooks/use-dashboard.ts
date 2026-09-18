import { keepPreviousData, useQuery } from "@tanstack/react-query";
import dashboardApi from "../api/dashboard.api";
import dashboardQueryKeys from "../query/dashboard.query-keys";

export const useDashboard = () => useQuery({
  queryKey: dashboardQueryKeys.dashboard(),
  queryFn: () => dashboardApi.getAdminDashboard(),
  placeholderData: keepPreviousData,
});

export default useDashboard;