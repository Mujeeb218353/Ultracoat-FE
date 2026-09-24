import { useQuery } from "@tanstack/react-query";
import featuresApi from "../api/features.api";

const useFeatureById = (id?: string) =>
  useQuery({
    queryKey: ["feature", id],
    queryFn: () => featuresApi.getFeatureById(id!),
    enabled: !!id,
  });

export default useFeatureById;