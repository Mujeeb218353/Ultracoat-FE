import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import representativesApi from "../api/representatives.api";
import { Representative, RepresentativesResponse } from "../types/representatives.types";

type UpdateRepresentativeStatusPayload = {
  id: string;
  isActive: boolean;
};

const useUpdateRepresentativeStatus = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationKey: ["representative-status"],
    mutationFn: ({ id, isActive }: UpdateRepresentativeStatusPayload) =>  representativesApi.updateRepresentativeStatus(id, { id, isActive } as Representative),
    onSuccess: (updatedRepresentative: Representative, variables) => {
      queryClient.setQueriesData<RepresentativesResponse>({ queryKey: ["representatives"] }, (old) => {
        if (!old) return old;

        const previousRepresentative = old.salesRepresentatives.find((rep) => rep.id === updatedRepresentative.id);
        const wasActive = Boolean(previousRepresentative?.isActive);
        const isNowActive = Boolean(updatedRepresentative.isActive);
        const activeDelta = wasActive === isNowActive ? 0 : isNowActive ? 1 : -1;

        return {
          ...old,
          salesRepresentatives: old.salesRepresentatives.map((rep) =>
            rep.id === updatedRepresentative.id ? { ...rep, ...updatedRepresentative } : rep,
          ),
          statistics: {
            ...old.statistics,
            active: Math.max(0, old.statistics.active + activeDelta),
            inactive: Math.max(0, old.statistics.inactive - activeDelta),
          },
        };
      });

      invalidateQueries([
        ["representatives"],
        ["representative", variables.id],
        ["dashboard"],
      ]);

      success("Representative status updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update representative status. Please try again later.");
    },
  });
};

export default useUpdateRepresentativeStatus;