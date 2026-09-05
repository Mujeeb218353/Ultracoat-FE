import { useQuery } from "@tanstack/react-query";
import representativesApi from "../api/representatives.api";

const useRepresentativeById = (id?: string) =>
  useQuery({
    queryKey: ["representative", id],
    queryFn: () => representativesApi.getRepresentativeById(id!),
    enabled: !!id,
  });

export default useRepresentativeById;