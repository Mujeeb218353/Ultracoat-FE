import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import featuresApi from "../api/features.api";
import featuresQueryKeys from "../query/features.query-keys";

const useFeaturesList = (options?: Partial<UseQueryOptions>) => {
  return useQuery({
    queryKey: featuresQueryKeys.featuresList(),
    queryFn: () => featuresApi.getFeaturesList(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

export default useFeaturesList;