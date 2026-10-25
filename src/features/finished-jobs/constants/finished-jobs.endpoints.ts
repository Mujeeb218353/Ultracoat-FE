import { Filters } from "@/utils/types";
import buildQuery from "@/utils/queryBuilder";
import { FinishedJobStatus } from "../types/finished-jobs.types";

const baseUrl = "/finished-jobs";

const finishedJobsEndpoints = {
  getFinishedJobs: (query: Filters<FinishedJobStatus>) => `${baseUrl}${buildQuery(query)}`,
  getFinishedJobById: (id: string) => `${baseUrl}/${id}`,
};

export default finishedJobsEndpoints;
