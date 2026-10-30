import { useQuery } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";
import quotationsQueryKeys from "../query/quotation.query-keys";

const useQuotationFileUrl = (id: string, enabled: boolean) => useQuery({
  queryKey: [...quotationsQueryKeys.quotationById(id), "file-url"],
  queryFn: () => quotationsApi.getQuotationPresignedUrl(id),
  enabled,
  staleTime: 0,
  gcTime: 0,
});

export default useQuotationFileUrl;