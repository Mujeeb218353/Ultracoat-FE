import buildQuery from "@/utils/queryBuilder";
import { Filters } from "@/utils/types";

const baseUrl = "/sizes";

const sizesEndpoints = {
  createSize: () => baseUrl,
  getSizes: (query: Filters) => `${baseUrl}${buildQuery(query)}`,
  getSizesList: () => `${baseUrl}/list`,
  getSizeById: (id: string) => `${baseUrl}/${id}`,
  updateSize: (id: string) => `${baseUrl}/${id}`,
  updateStatus: (id: string) => `${baseUrl}/status/${id}`,
  deleteSize: (id: string) => `${baseUrl}/${id}`,
} as const;

export default sizesEndpoints;