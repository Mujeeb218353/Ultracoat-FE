import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import followUpsEndpoints from "../constants/follow-ups.endpoints";
import { FollowUp, CreateFollowUpPayload, FollowUpResponse, FollowUpsByQuotationIdResponse, UpdateFollowUpPayload } from "../types/follow-ups.types";

const followUpsApi = {
  createFollowUp: (payload: CreateFollowUpPayload) => api.post<ApiResponse<FollowUp>>(followUpsEndpoints.createFollowUp(), payload).then((res) => res.data.data),
  updateFollowUp: (id: string, payload: UpdateFollowUpPayload) => api.put<ApiResponse<FollowUp>>(followUpsEndpoints.updateFollowUp(id), payload).then((res) => res.data.data),
  getFollowUpsByQuotationId: (quotationId: string) => api.get<ApiResponse<FollowUpsByQuotationIdResponse>>(followUpsEndpoints.getFollowUpsByQuotationId(quotationId)).then((res) => res.data.data.quotation),
  getQuotationsWithFollowUps: (query: Filters) => api.get<ApiResponse<FollowUpResponse>>(followUpsEndpoints.getQuotationsWithFollowUps(query)).then((res) => res.data.data),
};

export default followUpsApi;