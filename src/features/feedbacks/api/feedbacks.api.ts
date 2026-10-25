import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import feedbacksEndpoints from "../constants/feedbacks.endpoints";
import { Feedback, FeedbacksResponse, UpdateFeedbackPayload } from "../types/feedback.types";

const feedbacksApi = {
  getFeedbacks: (query: Filters) =>
    api.get<ApiResponse<FeedbacksResponse>>(feedbacksEndpoints.getFeedbacks(query))
      .then((res) => res.data.data),
  getFeedbackById: (id: string) =>
    api.get<ApiResponse<Feedback>>(feedbacksEndpoints.getFeedbackById(id))
      .then((res) => res.data.data),
  updateFeedback: (id: string, payload: UpdateFeedbackPayload) =>
    api.put<ApiResponse<Feedback>>(feedbacksEndpoints.updateFeedback(id), payload)
      .then((res) => res.data.data),
};

export default feedbacksApi;
