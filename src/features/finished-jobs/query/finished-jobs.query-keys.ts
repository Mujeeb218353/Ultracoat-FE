import { Filters } from "@/utils/types";
import { FinishedJobStatus } from "../types/finished-jobs.types";

const finishedJobsQueryKeys = {
  finishedJobs: (query: Filters<FinishedJobStatus>) => ["finished-jobs", query],
  finishedJobById: (id: string) => ["finished-jobs", id],
} as const;

export default finishedJobsQueryKeys;
