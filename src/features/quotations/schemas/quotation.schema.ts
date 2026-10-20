import { z } from "zod";
import { getVisibleGroups } from "../utils/feature.options";
import type { CreateQuotationPayload, ProductConfig } from "../types/quotations.types";

export const FREIGHT_CHARGES = ["Free of Karachi", "Outside Karachi"] as const;

export const quotationFormSchema = z.object({
  customerId: z.uuid({ message: "Select a customer" }),
  productId: z.uuid({ message: "Select a product type" }),
  specs: z.record(z.string(), z.string()),
  features: z.array(
    z.object({
      featureId: z.uuid(),
      options: z.record(z.string(), z.array(z.string())),
    })
  ),
  leadTime: z.string().min(1, "Lead time is required"),
  freightCharges: z.enum(FREIGHT_CHARGES, { message: "Freight is required" }),
  additionalNotes: z.string().max(1000, "Max 1000 characters"),
});

export type QuotationFormOutput = z.output<typeof quotationFormSchema>;

export const buildQuotationSchema = (config: ProductConfig | null) =>
  quotationFormSchema.superRefine((val, ctx) => {
    config?.specFields.forEach((field) => {
      if (field.required && !val.specs[field.key]) {
        ctx.addIssue({
          code: "custom",
          path: ["specs", field.key],
          message: `${field.label} is required`,
        });
      }
    });

    val.features.forEach((sel, i) => {
      const feature = config?.features.find((f) => f.id === sel.featureId);
      if (!feature) return;

      getVisibleGroups(feature, sel.options).forEach((group) => {
        const picked = sel.options[group.id!] ?? [];
        const path = ["features", i, "options", group.id!];
        if (picked.length === 0) {
          ctx.addIssue({ code: "custom", path, message: `Select ${group.label}` });
        } else if (group.selectionType === "SINGLE" && picked.length > 1) {
          ctx.addIssue({ code: "custom", path, message: `${group.label}: only one allowed` });
        }
      });
    });
  });

export const toCreatePayload = (v: QuotationFormOutput): CreateQuotationPayload => ({
  customer: v.customerId,
  productType: v.productId,
  features: v.features.map((f) => ({
    featureId: f.featureId,
    selectedValueIds: Object.values(f.options).flat(),
  })),
  material: v.specs.material,
  size: v.specs.size,
  paperType: v.specs.paperType,
  documentCategory: v.specs.documentCategory,
  quantity: Number(v.specs.quantity),
  leadTime: v.leadTime,
  freightCharges: v.freightCharges,
  additionalNotes: v.additionalNotes || undefined,
});