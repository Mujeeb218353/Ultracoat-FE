import { useMutation } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";

const useDownloadQuotationFile = (id: string, fileName = "quotation.pdf") => useMutation({
  mutationFn: () => quotationsApi.getQuotationPresignedUrl(id),
  onSuccess: async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = decodeURIComponent(fileName);
    a.click();
    URL.revokeObjectURL(blobUrl);
  },
});

export default useDownloadQuotationFile;