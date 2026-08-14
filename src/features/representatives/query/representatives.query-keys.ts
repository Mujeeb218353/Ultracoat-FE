import { Filters } from "@/utils/types";

const queryKeys = {
  representatives: (query: Filters) => ["representatives", query],
  representativesList: () => ["representatives", "list"],
  representative: (id: string) => ["representatives", id],
} as const;

export default queryKeys;