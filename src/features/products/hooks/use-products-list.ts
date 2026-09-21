import { keepPreviousData, useQuery } from "@tanstack/react-query";
import productsApi from "../api/products.api";
import productsQueryKeys from "../query/products.query-keys";

const useProductsList = () => useQuery({
  queryKey: productsQueryKeys.productsList(),
  queryFn: () => productsApi.getProductsList(),
  placeholderData: keepPreviousData,
  staleTime: 1 * 60 * 60 * 1000
});

export default useProductsList;