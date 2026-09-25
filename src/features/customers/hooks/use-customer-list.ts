import { keepPreviousData, useQuery } from "@tanstack/react-query";
import customersApi from "../api/customers.api";
import customersQueryKeys from "../query/customers.query-keys";

const useCustomersList = () => {
  return useQuery({
    queryKey: customersQueryKeys.customersList(),
    queryFn: () => customersApi.getCustomersList(),
    placeholderData: keepPreviousData,
  });
};

export default useCustomersList;