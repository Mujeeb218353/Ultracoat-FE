import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Filters } from "@/utils/types";
import feedbacksApi from "../api/feedbacks.api";
import feedbacksQueryKeys from "../query/feedbacks.query-keys";

const useFeedbacks = (query: Filters) => useQuery({
  queryKey: feedbacksQueryKeys.feedbacks(query),
  queryFn: () => feedbacksApi.getFeedbacks(query),
  placeholderData: keepPreviousData,
});

export default useFeedbacks;
