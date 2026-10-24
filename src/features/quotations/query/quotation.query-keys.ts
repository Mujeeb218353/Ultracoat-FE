import { Filters } from "@/utils/types";

const quotationsQueryKeys = {
  quotations: (query: Filters) => ["quotations", query],
  quotationsList: () => ["quotations", "list"],
  quotationById: (id: string) => ["quotation", id],
} as const;

export default quotationsQueryKeys;