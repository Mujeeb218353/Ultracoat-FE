import { Customer } from "@/features/customers/types/customers.types";
import { Product } from "@/features/products/types/products.types";
import { User } from "@/features/auth/types/auth.types";
import { Feature } from "@/features/features/types/features.types";

export type FreightCharges = 'Free of Karachi' | 'Outside Karachi';

export type QuotationStatus = 'PENDING' | 'QUOTED' | 'APPROVED' | 'REJECTED' | 'RE QUOTE' | 'SENT TO CUSTOMER';

export interface Quotation {
  id?: string;
  customer?: Customer;
  productType?: Product;
  features?: Feature[];
  material?: string;
  size?: string;
  quantity?: number;
  leadTime?: string;
  status?: QuotationStatus;
  freightCharges?: FreightCharges;
  paperType?: string;
  documentCategory?: string;
  additionalNotes?: string;
  file?: string;
  amount?: number;
  createdAt?: string;
  updatedAt?: string;
  creator?: User;
  updater?: User;
};

export interface Statistics {
  total: number;
  pending: number;
  quoted: number;
  approved: number;
  rejected: number;
  reQuote: number;
  sentToCustomer: number;
};

export interface QuotationsResponse {
  quotations: Quotation[];
  total: number;
  statistics: Statistics;
};

export interface Option {
  label: string;
  value: string;
}

export interface SpecField {
  key: string;
  label: string;
  required: boolean;
  options: Option[];
}

export interface ProductConfig {
  specFields: SpecField[];
  features: Feature[];
}

export interface SelectedFeature {
  featureId: string;
  options: Record<string, string[]>;
}

export interface QuotationFormState {
  customerId?: string;
  productId?: string;
  specs: Record<string, string>;
  features: SelectedFeature[];
  leadTime: string;
  freightCharges?: FreightCharges;
  additionalNotes: string;
}

export interface CreateQuotationPayload {
  customer: string;
  productType: string;
  features: { featureId: string; optionValueIds: string[] }[];
  material?: string;
  size?: string;
  paperType?: string;
  documentCategory?: string;
  quantity: number;
  leadTime: string;
  freightCharges: FreightCharges;
  additionalNotes?: string;
}

export const initialQuotationForm: QuotationFormState = {
  specs: {},
  features: [],
  leadTime: "",
  additionalNotes: "",
};