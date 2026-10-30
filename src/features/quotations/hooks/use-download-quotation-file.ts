import { useMutation } from "@tanstack/react-query";
import quotationsApi from "../api/quotations.api";

const triggerDownload = (href: string, fileName: string, newTab = false) => {
  const a = document.createElement("a");
  a.href = href;
  a.download = fileName;
  if (newTab) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const useDownloadQuotationFile = (id: string, fileName = "quotation.pdf") => useMutation({
  mutationFn: () => quotationsApi.getQuotationPresignedUrl(id),
  onSuccess: async (url) => {
    const name = decodeURIComponent(fileName);

    // Fetching the storage URL is blocked by CORS in production, so fall back to a direct link.
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Download failed");
      const blobUrl = URL.createObjectURL(await res.blob());
      triggerDownload(blobUrl, name);
      URL.revokeObjectURL(blobUrl);
    } catch {
      triggerDownload(url, name, true);
    }
  },
});

export default useDownloadQuotationFile;