import useAlert from "@/features/alert/hooks/use-alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import representativesApi from "../api/representatives.api";
import { Representative, RepresentativesResponse } from "../types/representatives.types";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";

const useUpdateRepresentative = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: Representative) =>
      representativesApi.updateRepresentative(payload.id ?? "", payload),
    onSuccess: (updatedRep: Representative, variables) => {
      
      queryClient.setQueriesData<RepresentativesResponse>({ queryKey: ["representatives"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          salesRepresentatives: old.salesRepresentatives.map((rep) =>
            rep.id === updatedRep.id ? { ...rep, ...updatedRep } : rep
          ),
        };
      });

      invalidateQueries([
        ["representatives"],
        ["representative", variables.id],
      ]);

      success("Representative updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update representative. Please try again later.");
    },
  });
};

export default useUpdateRepresentative;