import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import finishedJobsEndpoints from "../constants/finished-jobs.endpoints";
import {
  FinishedJobDetail,
  FinishedJobsResponse,
  FinishedJobStatus,
} from "../types/finished-jobs.types";

const finishedJobsApi = {
  getFinishedJobs: (query: Filters<FinishedJobStatus>) =>
    api.get<ApiResponse<FinishedJobsResponse>>(finishedJobsEndpoints.getFinishedJobs(query))
      .then((res) => res.data.data),
  getFinishedJobById: (id: string) =>
    api.get<ApiResponse<FinishedJobDetail>>(finishedJobsEndpoints.getFinishedJobById(id))
      .then((res) => res.data.data),
};

export default finishedJobsApi;
