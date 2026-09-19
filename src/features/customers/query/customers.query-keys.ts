import { Filters } from "@/utils/types";

const customersQueryKeys = {
  customers: (query: Filters) => ["customers", query],
  customersList: () => ["customers", "list"],
  customer: (id: string) => ["customers", id],
} as const;

export default customersQueryKeys;