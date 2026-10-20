import { useMutation } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";

const useDownloadQuotationFile = (id: string) => useMutation({
  mutationFn: () => quotationsApi.getQuotationPresignedUrl(id),
  onSuccess: (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  },
});

export default useDownloadQuotationFile;