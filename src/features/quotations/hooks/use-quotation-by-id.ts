import { useQuery } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";

const useQuotationById = (id: string) => useQuery({
  queryKey: ["quotation", id],
  queryFn: () => quotationsApi.getQuotationById(id),
  enabled: !!id,
});

export default useQuotationById;