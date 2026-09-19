import buildQuery from "@/utils/queryBuilder";
import { Filters } from "@/utils/types";

const baseUrl = "/customers";

const customersEndpoints = {
  createCustomer: () => baseUrl,
  getCustomers: (query: Filters) => `${baseUrl}${buildQuery(query)}`,
  getCustomersList: () => `${baseUrl}/list`,
  getCustomerById: (id: string) => `${baseUrl}/${id}`,
  updateCustomer: (id: string) => `${baseUrl}/${id}`,
  deleteCustomer: (id: string) => `${baseUrl}/${id}`,
};

export default customersEndpoints;