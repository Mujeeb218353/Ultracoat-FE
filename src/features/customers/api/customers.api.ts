import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import customersEndpoints from "../constants/customers.endpoints";
import { 
  Customer,
  CustomersResponse,
} from "../types/customers.types";

const customersApi = {
  createCustomer: (payload: Customer) => api.post<ApiResponse<Customer>>(customersEndpoints.createCustomer(), payload).then((res) => res.data.data),
  getCustomers: (query: Filters) => api.get<ApiResponse<CustomersResponse>>(customersEndpoints.getCustomers(query)).then((res) => res.data.data),
  getCustomersList: () => api.get<ApiResponse<Customer[]>>(customersEndpoints.getCustomersList()).then((res) => res.data.data),
  getCustomerById: (id: string) => api.get<ApiResponse<Customer>>(customersEndpoints.getCustomerById(id)).then((res) => res.data.data),
  updateCustomer: (id: string, payload: Customer) => api.put<ApiResponse<Customer>>(customersEndpoints.updateCustomer(id), payload).then((res) => res.data.data),
  deleteCustomer: (id: string) => api.delete<ApiResponse<null>>(customersEndpoints.deleteCustomer(id)).then((res) => res.data.data),
};

export default customersApi;