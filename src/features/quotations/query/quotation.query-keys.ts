import { Filters } from "@/utils/types";

const quotationsQueryKeys = {
  quotations: (query: Filters) => ["quotation", query],
  quotationsList: () => ["quotations", "list"],
  quotation: (id: string) => ["quotations", id],
} as const;

export default quotationsQueryKeys;