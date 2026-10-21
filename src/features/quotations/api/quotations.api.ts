import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import quotationsEndpoints from "../constants/quotations.endpoints";
import { 
  Quotation,
  QuotationsResponse,
  CreateQuotationPayload,
} from "../types/quotations.types";

const quotationsApi = {
  createQuotation: (payload: CreateQuotationPayload) => api.post<ApiResponse<Quotation>>(quotationsEndpoints.createQuotation(), payload).then((res) => res.data.data),
  getQuotations: (query: Filters) => api.get<ApiResponse<QuotationsResponse>>(quotationsEndpoints.getQuotations(query)).then((res) => res.data.data),
  getQuotationsList: () => api.get<ApiResponse<Quotation[]>>(quotationsEndpoints.getQuotationsList()).then((res) => res.data.data),
  getQuotationById: (id: string) => api.get<ApiResponse<Quotation>>(quotationsEndpoints.getQuotationById(id)).then((res) => res.data.data),
  updateQuotation: (id: string, payload: Quotation) => api.put<ApiResponse<Quotation>>(quotationsEndpoints.updateQuotation(id), payload).then((res) => res.data.data),
  uploadQuotationFile: (id: string, payload: FormData) => api.put<ApiResponse<Quotation>>(quotationsEndpoints.uploadQuotationFile(id), payload, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => res.data.data),
  quoteQuotationAmount: (id: string, payload: Quotation["amount"]) => api.put<ApiResponse<Quotation>>(quotationsEndpoints.quoteQuotationAmount(id), { amount: payload }).then((res) => res.data.data),
  sendQuotationToCustomer: (id: string) => api.get<ApiResponse<Quotation>>(quotationsEndpoints.sendQuotationToCustomer(id)).then((res) => res.data.data),
  getQuotationPresignedUrl: (id: string) => api.get<ApiResponse<{ url: string }>>(quotationsEndpoints.getQuotationPresignedUrl(id)).then((res) => res.data.data.url),
  updateQuotationStatus: (id: string, payload: Quotation["status"]) => api.put<ApiResponse<Quotation>>(quotationsEndpoints.updateQuotationStatus(id), { status: payload }).then((res) => res.data.data),
  deleteQuotation: (id: string) => api.delete<ApiResponse<null>>(quotationsEndpoints.deleteQuotation(id)).then((res) => res.data.data),
};

export default quotationsApi;