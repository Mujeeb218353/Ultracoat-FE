import { useQuery } from "@tanstack/react-query";
import { useHasHydrated, useIsAuthenticated, useUser } from "@/features/auth/selectors/auth.selector";
import notificationsApi from "../api/notification.api";

const useNotifications = (skip: number, limit: number, poll = false) => {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const hasHydrated = useHasHydrated();

  return useQuery({
    queryKey: ["notifications", user?.id, { skip, limit }],
    queryFn: () => notificationsApi.getNotifications({ skip, limit }),
    enabled: hasHydrated && isAuthenticated && !!user?.isVerified,
    refetchInterval: poll ? 60_000 : false,
    refetchOnMount: true,
  });
};

export default useNotifications;
