import api from "@/lib/api/axios";
import { ApiResponse, Filters } from "@/utils/types";
import sizesEndpoints from "../constants/sizes.endpoints";
import { Size, SizesResponse } from "../types/sizes.types";

const sizesApi = {
  createSize: (payload: Size) => api.post<ApiResponse<Size>>(sizesEndpoints.createSize(), payload).then((res) => res.data.data),
  getSizes: (query: Filters) => api.get<ApiResponse<SizesResponse>>(sizesEndpoints.getSizes(query)).then((res) => res.data.data),
  getSizesList: () => api.get<ApiResponse<Size[]>>(sizesEndpoints.getSizesList()).then((res) => res.data.data),
  getSizeById: (id: string) => api.get<ApiResponse<Size>>(sizesEndpoints.getSizeById(id)).then((res) => res.data.data),
  updateSize: (id: string, payload: Size) => api.put<ApiResponse<Size>>(sizesEndpoints.updateSize(id), payload).then((res) => res.data.data),
  updateSizeStatus: (id: string, isActive: boolean) => api.put<ApiResponse<Size>>(sizesEndpoints.updateStatus(id), { isActive }).then((res) => res.data.data),
  deleteSize: (id: string) => api.delete<ApiResponse<null>>(sizesEndpoints.deleteSize(id)).then((res) => res.data.data),
};

export default sizesApi;