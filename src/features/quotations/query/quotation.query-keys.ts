import { Filters } from "@/utils/types";

const quotationsQueryKeys = {
  quotations: (query: Filters) => ["quotations", query],
  quotationsList: () => ["quotations", "list"],
  quotation: (id: string) => ["quotation", id],
} as const;

export default quotationsQueryKeys;