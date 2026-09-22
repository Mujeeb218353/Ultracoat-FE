import { keepPreviousData, useQuery } from "@tanstack/react-query";
import sizesApi from "../api/sizes.api";
import sizesQueryKeys from "../query/sizes.query-keys";

const useSizesList = () => useQuery({
  queryKey: sizesQueryKeys.sizesList(),
  queryFn: () => sizesApi.getSizesList(),
  placeholderData: keepPreviousData,
});

export default useSizesList;