import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Address is required"),
  company: z.string().min(1, "Company is required"),
  designation: z.string().min(1, "Designation is required"),
});

export const updateCustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Address is required"),
  company: z.string().min(1, "Company is required"),
  designation: z.string().min(1, "Designation is required"),
});