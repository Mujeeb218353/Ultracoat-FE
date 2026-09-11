import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import representativesApi from "../api/representatives.api";
import { RepresentativesResponse } from "../types/representatives.types";

const useDeleteRepresentative = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (id: string) => representativesApi.deleteRepresentative(id),
    onSuccess: (_, id) => {
      queryClient.setQueriesData<RepresentativesResponse>({ queryKey: ["representatives"] }, (old) => {
        if (!old) return old;

        const deletedRepresentative = old.salesRepresentatives.find((rep) => rep.id === id);

        return {
          ...old,
          salesRepresentatives: old.salesRepresentatives.filter((rep) => rep.id !== id),
          total: Math.max(0, old.total - 1),
          statistics: {
            total: Math.max(0, old.statistics.total - 1),
            active: Math.max(0, old.statistics.active - (deletedRepresentative?.isActive ? 1 : 0)),
            inactive: Math.max(0, old.statistics.inactive - (!deletedRepresentative?.isActive ? 1 : 0)),
          },
        };
      });

      invalidateQueries([
        ["representatives"],
        ["dashboard"],
      ]);

      success("Representative deleted successfully!");
    },
    onError: (err) => {
      error(err, "Failed to delete representative. Please try again later.");
    },
  });
};

export default useDeleteRepresentative;