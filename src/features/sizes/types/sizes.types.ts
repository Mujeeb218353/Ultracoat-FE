import { User } from "@/features/auth/types/auth.types";
import { Product } from "@/features/products/types/products.types";

export interface Size {
  id?: string;
  name?: string;
  productId?: string;
  productDetail?: Product;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  creator?: User;
  updater?: User;
}

export interface Statistics {
  total: number;
  active: number;
  inactive: number;
}

export interface SizesResponse {
  sizes: Size[];
  total: number;
  statistics: Statistics;
}