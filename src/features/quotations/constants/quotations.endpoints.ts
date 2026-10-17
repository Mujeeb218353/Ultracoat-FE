import buildQuery from "@/utils/queryBuilder";
import { Filters } from "@/utils/types";

const baseUrl = "/quotations";

const quotationsEndpoints = {
  createQuotation: () => baseUrl,
  getQuotations: (query: Filters) => `${baseUrl}${buildQuery(query)}`,
  getQuotationsList: () => `${baseUrl}/list`,
  getQuotationById: (id: string) => `${baseUrl}/${id}`,
  updateQuotation: (id: string) => `${baseUrl}/${id}`,
  uploadQuotationFile: (id: string) => `${baseUrl}/upload/${id}`,
  quoteQuotationAmount: (id: string) => `${baseUrl}/quote-amount/${id}`,
  sendQuotationToCustomer: (id: string) => `${baseUrl}/send-to-customer/${id}`,
  updateQuotationStatus: (id: string) => `${baseUrl}/status/${id}`,
  getQuotationPresignedUrl : (id: string) => `${baseUrl}/file/${id}`,
  deleteQuotation: (id: string) => `${baseUrl}/${id}`,
};

export default quotationsEndpoints;