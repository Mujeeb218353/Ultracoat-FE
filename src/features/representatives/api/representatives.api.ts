import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import representativesEndpoints from "../constants/representatives.endpoints";
import { 
  Representative,
  RepresentativesResponse,
} from "../types/representatives.types";

const representativesApi = {
  createRepresentative: (payload: Representative) => api.post<ApiResponse<Representative>>(representativesEndpoints.createRepresentative(), payload).then((res) => res.data.data),
  getRepresentatives: (query: Filters) => api.get<ApiResponse<RepresentativesResponse>>(representativesEndpoints.getRepresentatives(query)).then((res) => res.data.data),
  getRepresentativesList: () => api.get<ApiResponse<Representative[]>>(representativesEndpoints.getRepresentativesList()).then((res) => res.data.data),
  getRepresentativeById: (id: string) => api.get<ApiResponse<Representative>>(representativesEndpoints.getRepresentativeById(id)).then((res) => res.data.data),
  updateRepresentative: (id: string, payload: Representative) => api.put<ApiResponse<Representative>>(representativesEndpoints.updateRepresentative(id), payload).then((res) => res.data.data),
  updateRepresentativeEmail: (id: string, payload: Representative) => api.put<ApiResponse<Representative>>(representativesEndpoints.updateRepresentativeEmail(id), payload).then((res) => res.data.data),
  updateRepresentativeStatus: (id: string, payload: Representative) => api.put<ApiResponse<Representative>>(representativesEndpoints.updateRepresentativeStatus(id), payload).then((res) => res.data.data),
  deleteRepresentative: (id: string) => api.delete<ApiResponse<null>>(representativesEndpoints.deleteRepresentative(id)).then((res) => res.data.data),
};

export default representativesApi;