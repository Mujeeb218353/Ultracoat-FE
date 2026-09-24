import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import featuresApi from "../api/features.api";
import { Feature, FeaturesResponse } from "../types/features.types";

type UpdateFeatureStatusPayload = {
  id: string;
  isActive: boolean;
};

const useUpdateFeatureStatus = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationKey: ["feature-status"],
    mutationFn: ({ id, isActive }: UpdateFeatureStatusPayload) =>  featuresApi.updateFeatureStatus(id, { id, isActive } as Feature),
    onSuccess: (updatedFeature: Feature, variables) => {
      queryClient.setQueriesData<FeaturesResponse>({ queryKey: ["features"] }, (old) => {
        if (!old) return old;

        const previousFeature = old.features.find((feature) => feature.id === updatedFeature.id);
        const wasActive = Boolean(previousFeature?.isActive);
        const isNowActive = Boolean(updatedFeature.isActive);
        const activeDelta = wasActive === isNowActive ? 0 : isNowActive ? 1 : -1;

        return {
          ...old,
          features: old.features.map((feature) =>
            feature.id === updatedFeature.id ? { ...feature, ...updatedFeature } : feature,
          ),
          statistics: {
            ...old.statistics,
            active: Math.max(0, old.statistics.active + activeDelta),
            inactive: Math.max(0, old.statistics.inactive - activeDelta),
          },
        };
      });

      invalidateQueries([
        ["features"],
        ["feature", variables.id],
      ]);

      success("Feature status updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update feature status. Please try again later.");
    },
  });
};

export default useUpdateFeatureStatus;