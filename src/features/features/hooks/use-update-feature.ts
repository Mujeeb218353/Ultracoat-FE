import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import featuresApi from "../api/features.api";
import { Feature, FeaturesResponse } from "../types/features.types";

const useUpdateFeature = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: Feature) => featuresApi.updateFeature(payload.id ?? "", payload),
    onSuccess: (updatedFeature: Feature, variables) => {
      queryClient.setQueriesData<FeaturesResponse>({ queryKey: ["features"] }, (old) => {
        if (!old) return old;

        return {
          ...old,
          statistics: {
            total: old.statistics.total,
            active: old.statistics.active + (updatedFeature.isActive ? 1 : 0) - (old.features.find((feature) => feature.id === updatedFeature.id)?.isActive ? 1 : 0),
            inactive: old.statistics.inactive + (updatedFeature.isActive ? 0 : 1) - (old.features.find((feature) => feature.id === updatedFeature.id)?.isActive ? 0 : 1),
          },
          features: old.features.map((feature) =>
            feature.id === updatedFeature.id ? { ...feature, ...updatedFeature } : feature,
          ),
        };
      });

      invalidateQueries([
        ["features"],
        ["feature", variables.id],
      ]);

      success("Feature updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update feature. Please try again later.");
    },
  });
};

export default useUpdateFeature;