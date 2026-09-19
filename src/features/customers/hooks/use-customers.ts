import { Filters } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import customersApi from "../api/customers.api";
import customersQueryKeys from "../query/customers.query-keys";

const useCustomers = ({ skip = 0, limit = 10, search = "", isActive = null }: Filters) => {
  return useQuery({
    queryKey: customersQueryKeys.customers({ skip, limit, search, isActive }),
    queryFn: () => customersApi.getCustomers({ skip, limit, search, isActive }),
    placeholderData: keepPreviousData,
  });
};

export default useCustomers;