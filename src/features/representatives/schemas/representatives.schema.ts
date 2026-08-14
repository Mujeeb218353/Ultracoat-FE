import { z } from "zod";

export const createRepresentativeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Address is required"),
  isActive: z.boolean().default(true),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const updateRepresentativeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Address is required"),
});

export const updateRepresentativeEmailSchema = z.object({
  email: z.email("Invalid email address"),
});

export const updateRepresentativeStatusSchema = z.object({
  isActive: z.boolean(),
});