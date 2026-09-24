import { Filters } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import featuresApi from "../api/features.api";
import featuresQueryKeys from "../query/features.query-keys";

const useFeatures = ({ skip = 0, limit = 10, search = "", isActive = null, productId = undefined }: Filters) => {
  return useQuery({
    queryKey: featuresQueryKeys.features({ skip, limit, search, isActive, productId }),
    queryFn: () => featuresApi.getFeatures({ skip, limit, search, isActive, productId }),
    placeholderData: keepPreviousData,
  });
};

export default useFeatures;