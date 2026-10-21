import useAlert from "@/features/alert/hooks/use-alert";
import useInvalidateQueries from "@/hooks/use-invalidate-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";
import { QuotationsResponse, Quotation } from "../types/quotations.types";

const useUploadQuotationFile = (id: string) => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateQueries();
  const { success, error } = useAlert();

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return quotationsApi.uploadQuotationFile(id, formData);
    },
    onSuccess: (updatedQuotation: Quotation) => {

      const key = ["quotations", { skip: 0, limit: 10, search: "", status: null, productId: null }];
      
      queryClient.setQueryData<QuotationsResponse>(key, (oldData) => {
        if (!oldData) return oldData;
    
        return {
          ...oldData,
          quotations: [updatedQuotation, ...oldData.quotations].slice(0, 10),
          statistics: {
            total: oldData.statistics.total + 1,
            pending: oldData.statistics.pending + (updatedQuotation.status === "PENDING" ? 1 : 0),
            approved: oldData.statistics.approved + (updatedQuotation.status === "APPROVED" ? 1 : 0),
            rejected: oldData.statistics.rejected + (updatedQuotation.status === "REJECTED" ? 1 : 0),
            quoted: oldData.statistics.quoted + (updatedQuotation.status === "QUOTED" ? 1 : 0),
            sentToCustomer: oldData.statistics.sentToCustomer + (updatedQuotation.status === "SENT TO CUSTOMER" ? 1 : 0),
            reQuote: oldData.statistics.reQuote + (updatedQuotation.status === "RE QUOTE" ? 1 : 0),
          },
        };
      });
    
      invalidateQueries([
        ["quotations"],
        ["quotations", "list"],
        ["quotation", id],
        ["dashboard"],
      ]);
      
      success("Quotation file uploaded successfully!");

      queryClient.setQueryData(["quotation", updatedQuotation.id], updatedQuotation);

    },
    onError: (err) => {
      error(err, "Failed to save quotation amount. Please try again later.");
    }
  });
};

export default useUploadQuotationFile;