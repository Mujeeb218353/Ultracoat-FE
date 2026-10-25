import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import followUpsApi from "../api/follow-ups.api";
import {
  UpdateFollowUpPayload,
  FollowUpsByQuotationIdResponse,
} from "../types/follow-ups.types";

const useUpdateFollowUp = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: UpdateFollowUpPayload) =>
      followUpsApi.updateFollowUp(payload.id ?? "", payload),
    onSuccess: (updated, variables) => {
      queryClient.setQueriesData<FollowUpsByQuotationIdResponse["quotation"]>(
        { queryKey: ["follow-ups", "quotation"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            followUps: old.followUps?.map((followUp) =>
              followUp.id === variables.id ? { ...followUp, ...updated } : followUp
            ),
          };
        }
      );

      invalidateQueries([
        ["follow-ups", "quotations"],
        ["follow-ups", "quotation"],
      ], "active");

      success("Follow-up updated successfully!");
    },
    onError: (err) => error(err, "Failed to update follow-up. Please try again later."),
  });
};

export default useUpdateFollowUp;