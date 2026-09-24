import { Filters } from "@/utils/types";

const featuresQueryKeys = {
  features: (query: Filters) => ["features", query],
  featuresList: () => ["features", "list"],
  feature: (id: string) => ["features", id],
} as const;

export default featuresQueryKeys;