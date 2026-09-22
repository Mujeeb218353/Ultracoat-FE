import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sizesApi from "../api/sizes.api";
import { Size, SizesResponse } from "../types/sizes.types";

const useUpdateSize = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: Size) => sizesApi.updateSize(payload.id ?? "", payload),
    onSuccess: (updatedSize: Size, variables) => {
      queryClient.setQueriesData<SizesResponse>({ queryKey: ["sizes"] }, (old) => {
        if (!old) return old;

        const sizes = Array.isArray(old.sizes) ? old.sizes : [];

        return {
          ...old,
          sizes: sizes.map((size) => (size.id === updatedSize.id ? { ...size, ...updatedSize } : size)),
        };
      });

      invalidateQueries([
        ["sizes"],
        ["size", variables.id],
      ]);

      success("Size updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update size. Please try again later.");
    },
  });
};

export default useUpdateSize;