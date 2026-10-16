import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import customersApi from "../api/customers.api";
import customersQueryKeys from "../query/customers.query-keys";

const useCustomersList = (options?: Partial<UseQueryOptions>) => useQuery({
  queryKey: customersQueryKeys.customersList(),
  queryFn: () => customersApi.getCustomersList(),
  placeholderData: keepPreviousData,
  ...options,
});

export default useCustomersList;