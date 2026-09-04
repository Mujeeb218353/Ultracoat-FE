import useAlert from "@/features/alert/hooks/use-alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import representativesApi from "../api/representatives.api";
import { Representative, RepresentativesResponse } from "../types/representatives.types";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";

const useCreateRepresentative = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: Representative) => representativesApi.createRepresentative(payload),
    onSuccess: (newRep: Representative) => {

      const key = ["representatives", { skip: 0, limit: 10, search: "", isActive: null }];

      queryClient.setQueryData<RepresentativesResponse>(key, (oldData) => {
        if (!oldData) return oldData;

        return {
          salesRepresentatives: [newRep, ...oldData.salesRepresentatives].slice(0, 10),
          total: oldData.total + 1,
          statistics: {
            total: oldData.statistics.total + 1,
            active: oldData.statistics.active + (newRep.isActive ? 1 : 0),
            inactive: oldData.statistics.inactive + (newRep.isActive ? 0 : 1),
          },
        };
      });  

      invalidateQueries([
        ["dashboard"],
        ["representatives"],
      ]);

      success("Representative created successfully!");
    },
    onError: (err) => {
      error(err, "Failed to create representative. Please try again later.");
    }
  });
};

export default useCreateRepresentative;