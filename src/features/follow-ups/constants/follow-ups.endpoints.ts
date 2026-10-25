import { Filters } from "@/utils/types";
import buildQuery from "@/utils/queryBuilder";

const baseUrl = "/follow-ups";

const followUpsEndpoints = {
  createFollowUp: () => baseUrl,
  updateFollowUp: (id: string) => `${baseUrl}/${id}`,
  getFollowUpsByQuotationId: (quotationId: string) => `${baseUrl}/quotations/${quotationId}`,
  getQuotationsWithFollowUps: (query: Filters) => `${baseUrl}/quotations${buildQuery(query)}`,
};

export default followUpsEndpoints;