import usePaginatedOptions from "@/hooks/use-paginated-options";
import customersApi from "../api/customers.api";
import customersQueryKeys from "../query/customers.query-keys";
import { Customer } from "../types/customers.types";

const getKey = (c: Customer) => c.id ?? "";

const useCustomersOptions = ({ search, enabled }: { search: string; enabled: boolean }) => usePaginatedOptions<Customer>({
  queryKey: customersQueryKeys.customersOptions(),
  fetchPage: async (query) => {
    const res = await customersApi.getCustomersList(query);
    return { items: res.customers, total: res.total };
  },
  getKey,
  search,
  enabled,
});

export const getCustomerOption = (c: Customer) => ({ value: c.id ?? "", label: c.name ?? "" });

export default useCustomersOptions;