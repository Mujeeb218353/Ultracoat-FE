import { Customer } from "@/features/customers/types/customers.types";
import { User } from "@/features/auth/types/auth.types";
import { Product } from "@/features/products/types/products.types";
import { QuotationStatus } from "@/features/quotations/types/quotations.types";

export type FinishedJobStatus = "PENDING" | "SUBMITTED";

export interface FinishedJobQuotation {
  id: string;
  status?: QuotationStatus;
  material?: string | null;
  size?: string | null;
  quantity?: number | null;
  leadTime?: string | null;
  freightCharges?: string | null;
  paperType?: string | null;
  documentCategory?: string | null;
  additionalNotes?: string | null;
  file?: string | null;
  amount?: number | null;
  createdAt?: string;
  updatedAt?: string;
  customerDetail?: Customer;
  productDetail?: Product;
  quotationFeatures?: {
    id: string;
    feature?: { id: string; name: string };
    selectedValues?: {
      id: string;
      optionValue?: { id: string; label?: string; value: string; sortOrder: number };
    }[];
  }[];
}

export interface FinishedJobListItem {
  id: string;
  status: FinishedJobStatus;
  updatedAt: string;
  avgRating: string;
  quotation: FinishedJobQuotation;
}

export interface FinishedJobsResponse {
  total: number;
  finishedJobs: FinishedJobListItem[];
}

export interface FinishedJobFeedback {
  id: string;
  status: FinishedJobStatus;
  updatedAt: string;
  avgRating: string;
  comment?: string | null;
  ratings?: Record<string, number>;
  quotation: FinishedJobQuotation;
  creator?: User;
  updater?: User;
}

export interface FinishedJobDetail {
  feedback: FinishedJobFeedback | null;
  projectTimeLine?: { message: string; createdAt: string }[];
  timeDuration?: string;
}
