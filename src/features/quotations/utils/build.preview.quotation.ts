import { Customer } from "@/features/customers/types/customers.types";
import { Product } from "@/features/products/types/products.types";
import { Feature } from "@/features/features/types/features.types";
import { getVisibleGroups } from "@/features/quotations/utils/feature.options";
import { Quotation, QuotationFormState } from "../types/quotations.types";

const toNumber = (value: string) => Number(value.replace(/\D/g, ""));

const buildPreviewQuotation = (values: QuotationFormState, product: Product | undefined, customer: Customer | undefined, allFeatures: Feature[]): Quotation => {
  const specs = values.specs ?? {};
  const pick = (key: string): string | undefined => specs[`${key}Other`] || specs[key] || undefined;
  const paperType = pick("paperType");
  const quantity = pick("quantity");

  return {
    customer,
    productType: product,
    features: (values.features ?? []).flatMap((sel) => {
      const feature = allFeatures.find((f) => f.id === sel.featureId);
      if (!feature) return [];
      const optionGroups = getVisibleGroups(feature, sel.options).map((g) => ({
        ...g,
        values: (g.values ?? []).filter((v) => !!v.id && (sel.options[g.id ?? ""] ?? []).includes(v.id)),
      }));
      return [{ ...feature, optionGroups }];
    }),
    material: pick("material"),
    size: pick("size"),
    paperType: paperType && specs.gsm ? `${paperType} (${specs.gsm})` : paperType,
    documentCategory: pick("documentCategory"),
    quantity: quantity ? toNumber(quantity) : undefined,
    leadTime: values.leadTime || undefined,
    freightCharges: values.freightCharges,
    additionalNotes: values.additionalNotes || undefined,
  };
};

export default buildPreviewQuotation;