import { User } from "@/features/auth/types/auth.types";
import { Quotation } from "@/features/quotations/types/quotations.types";

export type FeedbackStatus = 'PENDING' | 'SUBMITTED';

export interface Rating {
  quality?: number;
  time?: number;
  communication?: number;
  price?: number;
  service?: number;
};

export interface Feedback {
  id?: string;
  quotationId?: string;
  quotation?: Quotation;
  comment?: string;
  ratings?: Rating;
  avgRating?: string;
  status?: FeedbackStatus;
  createdAt?: string;
  updatedAt?: string;
  creator?: User;
  updater?: User;
};

export interface FeedbacksResponse {
  feedbacks: Feedback[];
  total: number;
  counts: {
    pending: number;
    submitted: number;
    total: number;
  };
  statistics: {
    averageRating: number;
    averageRatingChange: number;
    totalFeedbackChangePercent: number;
    positiveSentimentPercent: number;
    positiveSentimentChange: number;
    activeRepresentatives: number;
    satisfactionTrend: { month: string; avgRating: number }[];
    feedbackByCategory: { category: string; value: number }[];
  };
}

export interface UpdateFeedbackPayload {
  comment: string;
  ratings: Required<Rating>;
}