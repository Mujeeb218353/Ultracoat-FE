import { Filters } from "@/utils/types";

const queryKeys = {
  quotationsWithFollowUps: (query: Filters) => ["follow-ups", "quotations", query],
  followUpsByQuotationId: (quotationId: string) => ["follow-ups", "quotation", quotationId],
};

export default queryKeys;