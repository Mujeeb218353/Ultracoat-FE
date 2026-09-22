import { keepPreviousData, useQuery } from "@tanstack/react-query";
import sizesApi from "../api/sizes.api";
import sizesQueryKeys from "../query/sizes.query-keys";
import { Filters } from "@/utils/types";

const useSizes = ({ skip = 0, limit = 10, search = "", isActive = null, productId = undefined }: Filters) => useQuery({
  queryKey: sizesQueryKeys.sizes({ skip, limit, search, isActive, productId }),
  queryFn: () => sizesApi.getSizes({ skip, limit, search, isActive, productId }),
  placeholderData: keepPreviousData,
});

export default useSizes;