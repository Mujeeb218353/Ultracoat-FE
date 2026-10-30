import { Filters } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import representativesApi from "../api/representatives.api";
import representativesQueryKeys from "../query/representatives.query-keys";

const useRepresentatives = ({skip = 0, limit =  10, search = '', isActive = null}: Filters) => useQuery({
  queryKey: representativesQueryKeys.representatives({skip, limit, search, isActive}),
  queryFn: () => representativesApi.getRepresentatives({skip, limit, search, isActive }),
  placeholderData: keepPreviousData,
});

export default useRepresentatives;