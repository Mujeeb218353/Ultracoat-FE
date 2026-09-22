import { Filters } from "@/utils/types";

const sizesQueryKeys = {
  sizes: (query: Filters) => ["sizes", query],
  sizesList: () => ["sizes", "list"],
  size: (id: string) => ["sizes", id],
} as const;

export default sizesQueryKeys;