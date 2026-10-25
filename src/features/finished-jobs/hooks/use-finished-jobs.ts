import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Filters } from "@/utils/types";
import finishedJobsApi from "../api/finished-jobs.api";
import finishedJobsQueryKeys from "../query/finished-jobs.query-keys";
import { FinishedJobStatus } from "../types/finished-jobs.types";

const useFinishedJobs = (query: Filters<FinishedJobStatus>) => useQuery({
  queryKey: finishedJobsQueryKeys.finishedJobs(query),
  queryFn: () => finishedJobsApi.getFinishedJobs(query),
  placeholderData: keepPreviousData,
});

export default useFinishedJobs;
