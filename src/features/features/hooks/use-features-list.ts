import { keepPreviousData, useQuery } from "@tanstack/react-query";
import featuresApi from "../api/features.api";
import featuresQueryKeys from "../query/features.query-keys";

const useFeaturesList = () => {
  return useQuery({
    queryKey: featuresQueryKeys.featuresList(),
    queryFn: () => featuresApi.getFeaturesList(),
    placeholderData: keepPreviousData,
  });
};

export default useFeaturesList;