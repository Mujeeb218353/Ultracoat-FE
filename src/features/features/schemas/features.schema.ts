import { z } from "zod";

export const createFeatureSchema = z.object({
  name: z.string().min(1, "Name is required"),
  productId: z.uuid(),
  isActive: z.boolean().optional(),
  optionGroups: z.array(
    z.object({
      id: z.string().optional(),
      label: z.string().min(1, "Label is required"),
      sortOrder: z.number().optional(),
      dependsOnValueRef: z.string().nullable().optional(),
      selectionType: z.enum(["SINGLE", "MULTIPLE"]).optional(),
      values: z.array(
        z.object({
          id: z.string().optional(),
          label: z.string().min(1, "Label is required"),
          value: z.string().min(1, "Value is required"),
          sortOrder: z.number().optional(),
        })
      ).min(1, "At least one value is required"),
    })
  ).min(1, "At least one option group is required"),
});

export const updateFeatureSchema = z.object({
  id: z.uuid(),
  ...createFeatureSchema.shape
});