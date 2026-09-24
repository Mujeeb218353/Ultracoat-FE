import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import featuresEndpoints from "../constants/features.endpoints";
import { 
  Feature,
  FeaturesResponse,
} from "../types/features.types";

const featuresApi = {
  createFeature: (payload: Feature) => api.post<ApiResponse<Feature>>(featuresEndpoints.createFeature(), payload).then((res) => res.data.data),
  getFeatures: (query: Filters) => api.get<ApiResponse<FeaturesResponse>>(featuresEndpoints.getFeatures(query)).then((res) => res.data.data),
  getFeaturesList: () => api.get<ApiResponse<Feature[]>>(featuresEndpoints.getFeaturesList()).then((res) => res.data.data),
  getFeatureById: (id: string) => api.get<ApiResponse<Feature>>(featuresEndpoints.getFeatureById(id)).then((res) => res.data.data),
  updateFeature: (id: string, payload: Feature) => api.put<ApiResponse<Feature>>(featuresEndpoints.updateFeature(id), payload).then((res) => res.data.data),
  updateFeatureStatus: (id: string, payload: Feature) => api.put<ApiResponse<Feature>>(featuresEndpoints.updateFeatureStatus(id), payload).then((res) => res.data.data),
  deleteFeature: (id: string) => api.delete<ApiResponse<null>>(featuresEndpoints.deleteFeature(id)).then((res) => res.data.data),
};

export default featuresApi;