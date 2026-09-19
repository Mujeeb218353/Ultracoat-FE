import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customersApi from "../api/customers.api";
import { Customer, CustomersResponse } from "../types/customers.types";

const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: Customer) => customersApi.updateCustomer(payload.id ?? "", payload),
    onSuccess: (updatedCustomer: Customer, variables) => {
      queryClient.setQueriesData<CustomersResponse>({ queryKey: ["customers"] }, (old) => {
        if (!old) return old;

        return {
          ...old,
          customers: old.customers.map((customer) =>
            customer.id === updatedCustomer.id ? { ...customer, ...updatedCustomer } : customer,
          ),
        };
      });

      invalidateQueries([
        ["customers"],
        ["customer", variables.id],
      ]);

      success("Customer updated successfully!");
    },
    onError: (err) => {
      error(err, "Failed to update customer. Please try again later.");
    },
  });
};

export default useUpdateCustomer;