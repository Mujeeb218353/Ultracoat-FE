import type { FreightCharges } from "../types/quotations.types";

export const FREIGHT_CHARGES: FreightCharges[] = ["Free of Karachi", "Outside Karachi"];

export const LEAD_TIME_OPTIONS = ["7 WORKING DAYS", "10 WORKING DAYS", "14 WORKING DAYS", "30 WORKING DAYS"].map((v) => ({
  label: v,
  value: v,
}));

export const SPEC_FIELDS: Record<string, { key: string; label: string; required: boolean }[]> = {
  Label: [
    { key: "material", label: "Material", required: true },
    { key: "size", label: "Die Size", required: true },
    { key: "quantity", label: "Quantity", required: true },
  ],
  Sheet: [
    { key: "material", label: "Material", required: true },
    { key: "size", label: "Size", required: true },
    { key: "quantity", label: "Quantity", required: true },
  ],
  Document: [
    { key: "paperType", label: "Paper Type", required: true },
    { key: "documentCategory", label: "Category", required: true },
    { key: "quantity", label: "Quantity", required: true },
    { key: "size", label: "Size", required: true },
  ],
};

export const SPEC_OPTIONS: Record<string, { label: string; value: string }[]> = {
  material: ["SELF ADHESIVE 60GSM", "SELF ADHESIVE 80G", "FOAMATEC", "PVC SHRINKABLE SLEEVES"].map((v) => ({ label: v, value: v })),
  size: ["LEGAL SIZE", "A4", "A3", "MANUAL"].map((v) => ({ label: v, value: v })),
  quantity: ["100,000", "300,000", "500,000", "1,000,000", "OTHER"].map((v) => ({ label: v, value: v })),
  paperType: ["ORDINARY", "CBS-1 90GSM"].map((v) => ({ label: v, value: v })),
  documentCategory: ["COUPONS", "REGISTRATION LETTER", "PROPERTY DOCS", "EDUCATIONAL DOCS ( CERT, MARKSHEET ETC )"].map((v) => ({ label: v, value: v })),
};