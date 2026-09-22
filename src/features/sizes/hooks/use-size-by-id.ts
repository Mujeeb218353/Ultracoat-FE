import { useQuery } from "@tanstack/react-query";
import sizesApi from "../api/sizes.api";
import sizesQueryKeys from "../query/sizes.query-keys";

const useSizeById = (id?: string) => useQuery({
  queryKey: sizesQueryKeys.size(id ?? ""),
  queryFn: () => sizesApi.getSizeById(id!),
  enabled: !!id,
});

export default useSizeById;