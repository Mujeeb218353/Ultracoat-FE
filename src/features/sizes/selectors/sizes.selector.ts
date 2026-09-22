import useSizes from "../hooks/use-sizes";
import useSizesList from "../hooks/use-sizes-list";
import useSizeById from "../hooks/use-size-by-id";
import { Filters } from "@/utils/types";

export const useSizesData = (filters: Filters) => useSizes(filters).data;
export const useSizesQuery = (filters: Filters) => useSizes(filters);
export const useSizesListData = () => useSizesList().data ?? [];
export const useSizeData = (id?: string) => useSizeById(id).data;