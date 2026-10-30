import buildQuery from "@/utils/queryBuilder";
import { Filters } from "@/utils/types";

const baseUrl = "/products";

const productsEndpoints = {
  getProductsList: (query: Filters = {}) => `${baseUrl}/list${buildQuery(query)}`,
} as const;

export default productsEndpoints;