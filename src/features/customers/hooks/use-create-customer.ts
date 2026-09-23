import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customersApi from "../api/customers.api";
import customersQueryKeys from "../query/customers.query-keys";
import { Customer, CustomersResponse } from "../types/customers.types";

const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: Customer) => customersApi.createCustomer(payload),
    onSuccess: (newCustomer: Customer) => {
      const key = customersQueryKeys.customers({ skip: 0, limit: 10, search: "", isActive: null });

      queryClient.setQueryData<CustomersResponse>(key, (oldData) => {
        if (!oldData) return oldData;

        return {
          customers: [newCustomer, ...oldData.customers].slice(0, 10),
          total: oldData.total + 1,
          statistics: {
            total: oldData.statistics.total + 1,
          },
        };
      });

      invalidateQueries([
        ["customers"],
        ["dashboard"],
      ]);

      success("Customer created successfully!");
    },
    onError: (err) => {
      error(err, "Failed to create customer. Please try again later.");
    },
  });
};

export default useCreateCustomer;