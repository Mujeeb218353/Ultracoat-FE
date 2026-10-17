import { Filters } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";
import quotationsQueryKeys from "../query/quotation.query-keys";

const useQuotations = ({ skip = 0, limit = 10, search = "", status = null, productId = null }: Filters) => {
  return useQuery({
    queryKey: quotationsQueryKeys.quotations({ skip, limit, search, status, productId }),
    queryFn: () => quotationsApi.getQuotations({ skip, limit, search, status, productId }),
    placeholderData: keepPreviousData,
  });
};

export default useQuotations;