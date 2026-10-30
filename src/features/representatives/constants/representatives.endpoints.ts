import buildQuery from "@/utils/queryBuilder";
import { Filters } from "@/utils/types";

const baseUrl = "/sales-representatives";

const representativesEndpoints = {
  createRepresentative: () => baseUrl,
  getRepresentatives: (query: Filters) => `${baseUrl}${buildQuery(query)}`,
  getRepresentativesList: (query: Filters = {}) => `${baseUrl}/list${buildQuery(query)}`,
  getRepresentativeById: (id: string) => `${baseUrl}/${id}`,
  updateRepresentative: (id: string) => `${baseUrl}/${id}`,
  updateRepresentativeEmail: (id: string) => `${baseUrl}/email/${id}`,
  updateRepresentativeStatus: (id: string) => `${baseUrl}/status/${id}`,
  deleteRepresentative: (id: string) => `${baseUrl}/${id}`,
};

export default representativesEndpoints;