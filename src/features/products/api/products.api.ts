import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import productsEndpoints from "../constants/products.endpoints";
import { Product } from "../types/products.types";

const productsApi = {
  getProductsList: (query: Filters = {}) => api.get<ApiResponse<Product[]>>(productsEndpoints.getProductsList(query)).then((res) => res.data.data),
};

export default productsApi;