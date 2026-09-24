import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import productsApi from "../api/products.api";
import productsQueryKeys from "../query/products.query-keys";

const useProductsList = (options?: Partial<UseQueryOptions>) => useQuery({
  queryKey: productsQueryKeys.productsList(),
  queryFn: () => productsApi.getProductsList(),
  placeholderData: keepPreviousData,
  staleTime: 1 * 60 * 60 * 1000,
  ...options,
});

export default useProductsList;