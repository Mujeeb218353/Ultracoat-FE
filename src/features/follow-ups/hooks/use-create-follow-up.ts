import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import followUpsApi from "../api/follow-ups.api";
import {
  CreateFollowUpPayload,
  FollowUpsByQuotationIdResponse,
} from "../types/follow-ups.types";

const useCreateFollowUp = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: CreateFollowUpPayload) => followUpsApi.createFollowUp(payload),
    onSuccess: (newFollowUp, variables) => {
      queryClient.setQueryData<FollowUpsByQuotationIdResponse["quotation"]>(
        ["follow-ups", "quotation", variables.quotationId],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            followUps: [
              newFollowUp,
              ...(old.followUps ?? []).filter((followUp) => followUp.id !== newFollowUp.id),
            ],
          };
        }
      );

      invalidateQueries([
        ["follow-ups", "quotations"],
        ["follow-ups", "quotation", variables.quotationId],
      ], "active");

      success("Follow-up created successfully!");
    },
    onError: (err) => error(err, "Failed to create follow-up. Please try again later."),
  });
};

export default useCreateFollowUp;