import { useQuery } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";
import queryKeys from "../query/quotation.query-keys";

const useQuotationById = (id: string) => useQuery({
  queryKey: queryKeys.quotationById(id),
  queryFn: () => quotationsApi.getQuotationById(id),
  enabled: !!id,
});

export default useQuotationById;