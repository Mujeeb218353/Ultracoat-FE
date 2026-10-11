import { User } from "@/features/auth/types/auth.types";
import { Product } from "@/features/products/types/products.types";
import { z } from "zod";
import { createFeatureSchema, updateFeatureSchema } from "../schemas/features.schema";

export type FeatureGroupSelectionType = 'SINGLE' | 'MULTIPLE';

export interface OptionFeatureValue {
   id?: string;
   label?: string;
   value?: string;
   sortOrder?: number;
   groupId?: string;
   createdAt?: string;
   updatedAt?: string;
   creator?: User;
   updater?: User;
};

export interface OptionFeatureGroup {
  id?: string;
  label?: string;
  sortOrder?: number;
  dependsOnValueId?: string | null;
  dependsOnValueRef?: string | null;
  values?: OptionFeatureValue[];
  selectionType?: FeatureGroupSelectionType;
  featureId?: string;
  createdAt?: string;
  updatedAt?: string;
  creator?: User;
  updater?: User;
};

export interface Feature {
  id?: string;
  name?: string;
  isActive?: boolean;
  productDetail?: Product;
  optionGroups?: OptionFeatureGroup[];
  createdAt?: string;
  updatedAt?: string;
  creator?: User;
  updater?: User;
};

export interface FeaturesResponse {
  features: Feature[];
  total: number;
  statistics: {
    total: number;
    active: number;
    inactive: number;
  };
};

export type CreateFeaturePayloadRequest = z.infer<typeof createFeatureSchema>;
export type UpdateFeaturePayloadRequest = z.infer<typeof updateFeatureSchema>;