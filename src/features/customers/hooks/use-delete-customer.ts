import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customersApi from "../api/customers.api";
import { CustomersResponse } from "../types/customers.types";

const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (id: string) => customersApi.deleteCustomer(id),
    onSuccess: (_, id) => {
      queryClient.setQueriesData<CustomersResponse>({ queryKey: ["customers"] }, (old) => {
        if (!old) return old;

        return {
          ...old,
          customers: old.customers.filter((customer) => customer.id !== id),
          total: Math.max(0, old.total - 1),
          statistics: {
            total: Math.max(0, old.statistics.total - 1),
          },
        };
      });

      invalidateQueries([
        ["customers"],
        ["dashboard"],
      ]);

      success("Customer deleted successfully!");
    },
    onError: (err) => {
      error(err, "Failed to delete customer. Please try again later.");
    },
  });
};

export default useDeleteCustomer;