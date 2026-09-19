import { User } from "@/features/auth/types/auth.types";

export interface Customer {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  company?: string;
  designation?: string;
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

export interface CustomersResponse {
  customers: Customer[];
  total: number;
  statistics: Statistics;
};