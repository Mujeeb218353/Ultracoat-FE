import { z } from "zod";
import { User } from "@/features/auth/types/auth.types";
import { Quotation } from "@/features/quotations/types/quotations.types";
import { createFollowUpSchema, updateFollowUpSchema } from "../schemas/follow-up.schema";

export interface FollowUp {
  id?: string;
  quotationId?: string;
  quotation?: Quotation;
  purpose?: string;
  remarks?: string;
  nextFollowUpDate?: string;
  createdAt?: string;
  updatedAt?: string;
  creator?: User;
  updater?: User;
};

export interface FollowUpWithQuotation {
  id: string;
  customerDetail: User;
  lastFollowUp: {
    nextFollowUpDate: string | null;
    createdAt: string;
    daysSinceLastFollowUp: string | null;
  };
  isOverdue: boolean;
};

export interface FollowUpResponse {
  quotations: FollowUpWithQuotation[];
  total: number;
  statistics: {
    total: number;
    totalOverdue: number;
    totalIncoming: number;
  };
};

export interface FollowUpsByQuotationIdResponse {
  quotation: Quotation & {
    followUps: FollowUp[];
  };
};

export type CreateFollowUpPayload = z.infer<typeof createFollowUpSchema>;
export type UpdateFollowUpPayload = z.infer<typeof updateFollowUpSchema>;