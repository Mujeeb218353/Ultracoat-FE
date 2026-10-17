import { useMutation, useQueryClient } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";
import { CreateQuotationPayload, Quotation, QuotationsResponse } from "../types/quotations.types";
import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";

const useCreateQuotation = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (payload: CreateQuotationPayload) => quotationsApi.createQuotation(payload),
    onSuccess: (newQuotation: Quotation, variables) => {
      const key = ["quotations", { skip: 0, limit: 10, search: "", status: null, productId: variables.productId }];
      
      queryClient.setQueryData<QuotationsResponse>(key, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          quotations: [newQuotation, ...oldData.quotations].slice(0, 10),
          total: oldData.total + 1,
          statistics: {
            total: oldData.statistics.total + 1,
            pending: oldData.statistics.pending + (newQuotation.status === "PENDING" ? 1 : 0),
            approved: oldData.statistics.approved + (newQuotation.status === "APPROVED" ? 1 : 0),
            rejected: oldData.statistics.rejected + (newQuotation.status === "REJECTED" ? 1 : 0),
            quoted: oldData.statistics.quoted + (newQuotation.status === "QUOTED" ? 1 : 0),
            sentToCustomer: oldData.statistics.sentToCustomer + (newQuotation.status === "SENT TO CUSTOMER" ? 1 : 0),
            reQuote: oldData.statistics.reQuote + (newQuotation.status === "RE QUOTE" ? 1 : 0),
          },
        };
      });

      invalidateQueries([
        ["quotations"],
        ["dashboard"],
      ]);

      success("Quotation created successfully!");
    },
    onError: (err) => {
      error(err, "Failed to create quotation. Please try again later.");
    },
  });
};

export default useCreateQuotation;