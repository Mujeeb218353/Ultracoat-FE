import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import sizesApi from "../api/sizes.api";
import sizesQueryKeys from "../query/sizes.query-keys";

const useSizesList = (options?: Partial<UseQueryOptions>) => useQuery({
  queryKey: sizesQueryKeys.sizesList(),
  queryFn: () => sizesApi.getSizesList(),
  placeholderData: keepPreviousData,
  ...options,
});

export default useSizesList;