import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import representativesApi from "../api/representatives.api";
import { Representative, RepresentativesResponse } from "../types/representatives.types";

type UpdateRepresentativeEmailPayload = {
  id: string;
  email: string;
};

const useUpdateRepresentativeEmail = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: ({ id, email }: UpdateRepresentativeEmailPayload) => representativesApi.updateRepresentativeEmail(id, { id, email } as Representative),
    onSuccess: (updatedRepresentative: Representative, variables) => {
      queryClient.setQueriesData<RepresentativesResponse>({ queryKey: ["representatives"] }, (old) => {
        if (!old) return old;

        return {
          ...old,
          salesRepresentatives: old.salesRepresentatives.map((rep) =>
            rep.id === updatedRepresentative.id ? { ...rep, ...updatedRepresentative } : rep,
          ),
        };
      });

      invalidateQueries([
        ["representatives"],
        ["representative", variables.id],
        ["dashboard"],
      ]);

      success("Representative email updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update representative email. Please try again later.");
    },
  });
};

export default useUpdateRepresentativeEmail;