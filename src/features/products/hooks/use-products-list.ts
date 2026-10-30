import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import usePaginatedOptions from "@/hooks/use-paginated-options";
import productsApi from "../api/products.api";
import productsQueryKeys from "../query/products.query-keys";
import { Product } from "../types/products.types";

const useProductsList = (options?: Partial<UseQueryOptions>) => useQuery({
  queryKey: productsQueryKeys.productsList(),
  queryFn: () => productsApi.getProductsList(),
  placeholderData: keepPreviousData,
  staleTime: 1 * 60 * 60 * 1000,
  ...options,
});

const getKey = (p: Product) => p.id;

export const useProductsOptions = ({ search, enabled }: { search: string; enabled: boolean }) => usePaginatedOptions<Product>({
  queryKey: productsQueryKeys.productsOptions(),
  fetchPage: async (query) => ({ items: await productsApi.getProductsList(query) }),
  getKey,
  search,
  enabled,
});

export const getProductOption = (p: Product) => ({ value: p.id, label: p.name });

export default useProductsList;