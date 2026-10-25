import { keepPreviousData, useQuery } from "@tanstack/react-query";
import followUpsApi from "../api/follow-ups.api";
import queryKeys from "../query/follow-ups.query-key";

const useFollowUpsByQuotationId = (quotationId: string) => useQuery({
  queryKey: queryKeys.followUpsByQuotationId(quotationId),
  queryFn: () => followUpsApi.getFollowUpsByQuotationId(quotationId),
  placeholderData: keepPreviousData,
  enabled: !!quotationId,
});

export default useFollowUpsByQuotationId;