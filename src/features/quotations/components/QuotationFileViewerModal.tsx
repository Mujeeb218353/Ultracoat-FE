"use client";

import { Button, Result, Spin } from "antd";
import { Download, ExternalLink, FileText } from "lucide-react";
import Modal from "@/components/Modal";
import useQuotationFileUrl from "../hooks/use-quotation-file-url";

interface Props {
  id: string;
  fileName?: string;
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  downloading?: boolean;
}

const getExtension = (name = "") => name.split("?")[0].split(".").pop()?.toLowerCase() ?? "";

const QuotationFileViewerModal = ({ id, fileName = "quotation.pdf", open, onClose, onDownload, downloading }: Props) => {
  const { data: url, isFetching, isError } = useQuotationFileUrl(id, open);
  const ext = getExtension(decodeURIComponent(fileName));
  const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
  const isPdf = ext === "pdf";
  const canPreview = isPdf || isImage;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={960}
      title="Quotation File"
      description={decodeURIComponent(fileName)}
      icon={<FileText size={18} />}
      footer={
        <div className="flex justify-end gap-2">
          {url && (
            <Button icon={<ExternalLink size={14} />} href={url} target="_blank" rel="noopener noreferrer">
              Open in new tab
            </Button>
          )}
          <Button type="primary" icon={<Download size={14} />} loading={downloading} onClick={onDownload}>
            Download
          </Button>
        </div>
      }
    >
      <div className="h-[70vh] w-full overflow-hidden rounded-lg border border-gray-200 dark:border-white/10">
        {isFetching && (
          <div className="flex h-full items-center justify-center">
            <Spin />
          </div>
        )}

        {!isFetching && (isError || !url) && <Result status="error" title="Unable to load file" />}

        {!isFetching && url && !canPreview && (
          <Result icon={<FileText size={40} />} title="Preview not available for this file type" subTitle="Use download or open in a new tab." />
        )}

        {!isFetching && url && isPdf && <iframe src={url} title="Quotation file" className="h-full w-full border-0" />}

        {!isFetching && url && isImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="Quotation file" className="h-full w-full object-contain" />
        )}
      </div>
    </Modal>
  );
};

export default QuotationFileViewerModal;
