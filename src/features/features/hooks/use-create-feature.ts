import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import featuresApi from "../api/features.api";
import featuresQueryKeys from "../query/features.query-keys";
import { Feature, FeaturesResponse } from "../types/features.types";

const useCreateFeature = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: Feature) => featuresApi.createFeature(payload),
    onSuccess: (newFeature: Feature) => {
      const key = featuresQueryKeys.features({ skip: 0, limit: 10, search: "", isActive: null, productId: undefined });

      queryClient.setQueryData<FeaturesResponse>(key, (oldData) => {
        if (!oldData) return oldData;

        return {
          features: [newFeature, ...oldData.features].slice(0, 10),
          total: oldData.total + 1,
          statistics: {
            total: oldData.statistics.total + 1,
            active: oldData.statistics.active + (newFeature.isActive ? 1 : 0),
            inactive: oldData.statistics.inactive + (newFeature.isActive ? 0 : 1),
          },
        };
      });

      invalidateQueries([
        ["features"],
        ["features", "list"],
      ]);

      success("Feature created successfully!");
    },
    onError: (err) => {
      error(err, "Failed to create feature. Please try again later.");
    },
  });  
};

export default useCreateFeature;