import { useQuery } from "@tanstack/react-query";
import feedbacksApi from "../api/feedbacks.api";
import feedbacksQueryKeys from "../query/feedbacks.query-keys";

const useFeedbackById = (id: string) => useQuery({
  queryKey: feedbacksQueryKeys.feedbackById(id),
  queryFn: () => feedbacksApi.getFeedbackById(id),
  enabled: !!id,
});

export default useFeedbackById;
