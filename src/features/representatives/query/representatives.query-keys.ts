import { Filters } from "@/utils/types";

const queryKeys = {
  representatives: (query: Filters) => ["representatives", query],
  representativesList: () => ["representatives", "list"],
  representativesOptions: () => ["representatives", "options"],
  representative: (id: string) => ["representatives", id],
} as const;

export default queryKeys;