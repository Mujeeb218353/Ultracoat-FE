import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sizesApi from "../api/sizes.api";
import { SizesResponse } from "../types/sizes.types";

const useDeleteSize = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (id: string) => sizesApi.deleteSize(id),
    onSuccess: (_, id) => {
      queryClient.setQueriesData<SizesResponse>({ queryKey: ["sizes"] }, (old) => {
        if (!old) return old;

        const sizes = Array.isArray(old.sizes) ? old.sizes : [];
        const deletedSize = sizes.find((size) => size.id === id);
        const nextSizes = sizes.filter((size) => size.id !== id);
        const currentTotal = typeof old.total === "number" ? old.total : sizes.length;
        const statistics = old.statistics ?? {
          total: sizes.length,
          active: sizes.filter((size) => size.isActive).length,
          inactive: sizes.filter((size) => !size.isActive).length,
        };

        const nextTotal = Math.max(0, currentTotal - (deletedSize ? 1 : 0));
        const nextActive = Math.max(0, (statistics.active ?? 0) - (deletedSize?.isActive ? 1 : 0));
        const nextInactive = Math.max(0, (statistics.inactive ?? 0) - (!deletedSize?.isActive ? 1 : 0));

        return {
          ...old,
          sizes: nextSizes,
          total: nextTotal,
          statistics: {
            total: nextTotal,
            active: nextActive,
            inactive: nextInactive,
          },
        };
      });

      invalidateQueries([
        ["sizes"],
      ]);

      success("Size deleted successfully!");
    },
    onError: (err) => {
      error(err, "Failed to delete size. Please try again later.");
    },
  });
};

export default useDeleteSize;