import { Filters } from "@/utils/types";

const feedbacksQueryKeys = {
  feedbacks: (query: Filters) => ["feedbacks", query],
  feedbackById: (id: string) => ["feedbacks", id],
};

export default feedbacksQueryKeys;
