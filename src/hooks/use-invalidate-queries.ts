import { useQueryClient, QueryKey, InvalidateQueryFilters } from "@tanstack/react-query";

type Target = QueryKey | InvalidateQueryFilters;
type RefetchType = "active" | "inactive" | "all" | "none";

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return (targets: Target[], refetchType: RefetchType = "none") =>
    Promise.all(
      targets.map((t) => {
        const filters = Array.isArray(t) ? { queryKey: t } : t;
        return queryClient.invalidateQueries({ refetchType, ...filters });
      })
    );
};

export default useInvalidateQueries;