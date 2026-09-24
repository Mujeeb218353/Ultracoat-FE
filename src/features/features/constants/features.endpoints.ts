import buildQuery from "@/utils/queryBuilder";
import { Filters } from "@/utils/types";

const baseUrl = "/features";

const featuresEndpoints = {
  createFeature: () => baseUrl,
  getFeatureById: (id: string) => `${baseUrl}/${id}`,
  updateFeature: (id: string) => `${baseUrl}/${id}`,
  updateFeatureStatus: (id: string) => `${baseUrl}/status/${id}`,
  deleteFeature: (id: string) => `${baseUrl}/${id}`,
  getFeaturesList: () => `${baseUrl}/list`,
  getFeatures: (query: Filters) => `${baseUrl}${buildQuery(query)}`,
};

export default featuresEndpoints;