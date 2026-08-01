import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import dashboardApi from "../api/dashboard.api";
import { queryKeys } from "../query/dashboard.query-keys";
import { useSetDashboard } from "../selectors/dashboard.selector";

const useDashboard = () => {
  const setDashboard = useSetDashboard();

  const query = useQuery({
    queryKey: queryKeys.dashboard(),
    queryFn: () => dashboardApi.getAdminDashboard(),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setDashboard(query.data);
    }
  }, [query.data, setDashboard]);

  return query;
};

export default useDashboard;