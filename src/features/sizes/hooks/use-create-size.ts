import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sizesApi from "../api/sizes.api";
import sizesQueryKeys from "../query/sizes.query-keys";
import { Size, SizesResponse } from "../types/sizes.types";

const useCreateSize = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: Size) => sizesApi.createSize(payload),
    onSuccess: (newSize: Size) => {
      const key = sizesQueryKeys.sizes({ skip: 0, limit: 10, search: "", isActive: null });

      queryClient.setQueryData<SizesResponse>(key, (oldData) => {
        if (!oldData) return oldData;

        return {
          sizes: [newSize, ...oldData.sizes].slice(0, 10),
          total: oldData.total + 1,
          statistics: {
            total: oldData.statistics.total + 1,
            active: oldData.statistics.active + (newSize.isActive ? 1 : 0),
            inactive: oldData.statistics.inactive + (newSize.isActive ? 0 : 1),
          },
        };
      });

      invalidateQueries([
        ["sizes"],
      ]);

      success("Size created successfully!");
    },
    onError: (err) => {
      error(err, "Failed to create size. Please try again later.");
    },
  });
};

export default useCreateSize;