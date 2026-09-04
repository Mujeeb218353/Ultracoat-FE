import { User } from "@/features/auth/types/auth.types";

export interface Representative {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  role?: "ADMIN";
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  creator?: User;
  updater?: User;
};

export interface Statistics {
  total: number;
  active: number;
  inactive: number;
}

export interface RepresentativesResponse {
  salesRepresentatives: Representative[];
  total: number;
  statistics: Statistics;
};