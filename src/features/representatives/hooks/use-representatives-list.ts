import usePaginatedOptions from "@/hooks/use-paginated-options";
import representativesApi from "../api/representatives.api";
import representativesQueryKeys from "../query/representatives.query-keys";
import { Representative } from "../types/representatives.types";

const getKey = (r: Representative) => r.id ?? "";

const useRepresentativesOptions = ({ search, enabled }: { search: string; enabled: boolean }) => usePaginatedOptions<Representative>({
  queryKey: representativesQueryKeys.representativesOptions(),
  fetchPage: async (query) => {
    const res = await representativesApi.getRepresentativesList(query);
    return { items: res.salesRepresentatives, total: res.total };
  },
  getKey,
  search,
  enabled,
});

export const getRepresentativeOption = (r: Representative) => ({ value: r.id ?? "", label: r.name ?? "" });

export default useRepresentativesOptions;
