import { useQuery } from "@tanstack/react-query";
import customersApi from "../api/customers.api";

const useCustomerById = (id?: string) =>
  useQuery({
    queryKey: ["customer", id],
    queryFn: () => customersApi.getCustomerById(id!),
    enabled: !!id,
  });

export default useCustomerById;