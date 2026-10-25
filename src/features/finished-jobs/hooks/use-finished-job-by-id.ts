import { useQuery } from "@tanstack/react-query";
import finishedJobsApi from "../api/finished-jobs.api";
import finishedJobsQueryKeys from "../query/finished-jobs.query-keys";

const useFinishedJobById = (quotationId: string) => useQuery({
  queryKey: finishedJobsQueryKeys.finishedJobById(quotationId),
  queryFn: () => finishedJobsApi.getFinishedJobById(quotationId),
  enabled: !!quotationId,
});

export default useFinishedJobById;
