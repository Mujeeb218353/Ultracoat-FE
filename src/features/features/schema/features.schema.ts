import { z } from "zod";

export const createFeatureSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isActive: z.boolean().optional(),
  optionGroups: z.array(
    z.object({
      label: z.string().min(1, "Label is required"),
      sortOrder: z.number().optional(),
      dependsOnValueRef: z.string().optional(),
      selectionType: z.enum(["SINGLE", "MULTIPLE"]).optional(),
      values: z.array(
        z.object({
          label: z.string().min(1, "Label is required"),
          value: z.string().min(1, "Value is required"),
          sortOrder: z.number().optional(),
        })
      ).optional(),
    })
  ).optional(),
});

export const updateFeatureSchema = createFeatureSchema;