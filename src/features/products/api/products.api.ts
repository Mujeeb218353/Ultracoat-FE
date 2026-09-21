import api from "@/lib/api/axios";
import { ApiResponse } from "@/utils/types";
import productsEndpoints from "../constants/products.endpoints";
import { Product } from "../types/products.types";

const productsApi = {
  getProductsList: () => api.get<ApiResponse<Product[]>>(productsEndpoints.getProductsList()).then((res) => res.data.data),
};

export default productsApi;