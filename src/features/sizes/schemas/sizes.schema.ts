import { z } from "zod";

export const createSizeSchema = z.object({
  name: z.string().min(1, "Size is required"),
  productId: z.uuid("Product ID must be a valid UUID"),
  isActive: z.boolean().default(true),
});

export const updateSizeSchema = z.object({
  name: z.string().min(1, "Size is required"),
  productId: z.uuid("Product ID must be a valid UUID"),
  isActive: z.boolean(),
});