import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Filters } from "@/utils/types";
import followUpsApi from "../api/follow-ups.api";
import queryKeys from "../query/follow-ups.query-key";

const useQuotationsWithFollowUps = (query: Filters) => useQuery({
  queryKey: queryKeys.quotationsWithFollowUps(query),
  queryFn: () => followUpsApi.getQuotationsWithFollowUps(query),
  placeholderData: keepPreviousData,
});

export default useQuotationsWithFollowUps;