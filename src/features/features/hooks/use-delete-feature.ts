import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import featuresApi from "../api/features.api";
import { FeaturesResponse } from "../types/features.types";

const useDeleteFeature = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (id: string) => featuresApi.deleteFeature(id),
    onSuccess: (_, id) => {
      queryClient.setQueriesData<FeaturesResponse>({ queryKey: ["features"] }, (old) => {
        if (!old) return old;

        return {
          ...old,
          features: old.features.filter((feature) => feature.id !== id),
          total: Math.max(0, old.total - 1),
          statistics: {
            total: Math.max(0, old.statistics.total - 1),
            active: Math.max(0, old.statistics.active - 1),
            inactive: Math.max(0, old.statistics.inactive - 1),
          },
        };
      });

      invalidateQueries([
        ["features"],
        ["dashboard"],
      ]);

      success("Feature deleted successfully!");
    },
    onError: (err) => {
      error(err, "Failed to delete feature. Please try again later.");
    },
  });
};

export default useDeleteFeature;