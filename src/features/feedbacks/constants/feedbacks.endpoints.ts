import { Filters } from "@/utils/types";
import buildQuery from "@/utils/queryBuilder";

const baseUrl = "/feedbacks";

const feedbacksEndpoints = {
  getFeedbacks: (query: Filters) => `${baseUrl}${buildQuery(query)}`,
  getFeedbackById: (id: string) => `${baseUrl}/${id}`,
  updateFeedback: (id: string) => `${baseUrl}/${id}`,
};

export default feedbacksEndpoints;
