import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import feedbacksApi from "../api/feedbacks.api";
import feedbacksQueryKeys from "../query/feedbacks.query-keys";
import { UpdateFeedbackPayload } from "../types/feedback.types";

interface UpdateVariables {
  id: string;
  payload: UpdateFeedbackPayload;
}

const useUpdateFeedback = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateVariables) => feedbacksApi.updateFeedback(id, payload),
    onSuccess: async (updated, { id }) => {
      queryClient.setQueryData(feedbacksQueryKeys.feedbackById(id), updated);
      await invalidateQueries([["feedbacks"]], "all");
      success("Feedback updated successfully!");
    },
    onError: (err) => error(err, "Failed to update feedback. Please try again later."),
  });
};

export default useUpdateFeedback;
