import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sizesApi from "../api/sizes.api";
import { SizesResponse } from "../types/sizes.types";

const useUpdateSizeStatus = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => sizesApi.updateSizeStatus(id, isActive),
    onSuccess: (updatedSize) => {
      queryClient.setQueriesData<SizesResponse>({ queryKey: ["sizes"] }, (old) => {
        if (!old) return old;

        const sizes = Array.isArray(old.sizes) ? old.sizes : [];

        return {
          ...old,
          sizes: sizes.map((size) => (size.id === updatedSize.id ? { ...size, ...updatedSize } : size)),
        };
      });

      invalidateQueries([["sizes"]]);
      success("Size status updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update size status. Please try again later.");
    },
  });
};

export default useUpdateSizeStatus;