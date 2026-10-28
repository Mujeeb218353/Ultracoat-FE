import { useState } from "react";
import { DollarSign, Download, Send, Upload as UploadIcon } from "lucide-react";
import { Button, InputNumber, Upload } from "antd";
import type { UploadFile } from "antd";
import SectionCard from "./SectionCard";
import useQuoteAmount from "../hooks/use-quote-amount";
import useUploadQuotationFile from "../hooks/use-upload-quotation-file";
import useSendQuotationToCustomer from "../hooks/use-send-quotation-to-customer";
import useUpdateQuotationStatus from "../hooks/use-update-quotation-status";
import useDownloadQuotationFile from "../hooks/use-download-quotation-file";
import { Quotation } from "../types/quotations.types";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/auth/selectors/auth.selector";

interface Props {
  quotation: Quotation;
}

const QuotationActionsCard = ({ quotation }: Props) => {
  const user = useUser();
  const isCreator = user?.id === quotation?.creator?.id;
  const router = useRouter();
  const id = quotation.id ?? "";
  const status = quotation.status;
  const isLabel = quotation.productDetail?.name === "Label";
  const canQuote = status === "PENDING" || status === "RE QUOTE";

  const [amount, setAmount] = useState<number | null>(quotation.amount ?? null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const quoteAmount = useQuoteAmount(id);
  const uploadQuotationFile = useUploadQuotationFile(id);
  const sendToCustomer = useSendQuotationToCustomer(id);
  const updateStatus = useUpdateQuotationStatus(id);
  const download = useDownloadQuotationFile(id, quotation.file ?? "quotation.pdf");


  const handleQuote = () => {
    if (amount !== null && amount > 0) {
      quoteAmount.mutate(amount, {
        onSuccess: () => {
          setAmount(null);
          router.push(`/quotations/${id}`);
        },
      });
    }
    const file = fileList[0]?.originFileObj;
    if (isLabel && file) uploadQuotationFile.mutate(file as File, {
      onSuccess: () => {
        setFileList([]);
        router.push(`/quotations/${id}`);
      },
    });
  };

  const isStatusLoading = (s: string) => updateStatus.isPending && updateStatus.variables === s;


  return (
    <SectionCard 
      icon={DollarSign} 
      title="Quotation"
      className="w-full! sm:w-40! md:w-60! lg:w-80! xl:w-96!"
      headerClassName="bg-[#001529] rounded-t-lg text-white"
    >
      <div className="flex flex-col gap-4">
        {canQuote && (
          <>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase text-gray-500">Quote Amount (Rs)</span>
              <InputNumber className="w-full!" min={0} value={amount} onChange={setAmount} placeholder="Enter amount" formatter={(v) => `${v ?? ""}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => Number(String(v ?? "").replace(/,/g, ""))} />
            </div>

            {isLabel && (
              <div className="w-full flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase text-gray-500">Quotation File</span>
                <Upload 
                  beforeUpload={() => false} 
                  maxCount={1} fileList={fileList}
                  onChange={({ fileList: next }) => setFileList(next)}
                  className="w-full! flex! flex-col! justify-center! items-center! "
                >
                  <Button
                    loading={uploadQuotationFile.isPending} 
                    icon={<UploadIcon size={14} />}
                    className="w-full!"
                  >
                    Select file
                  </Button>
                </Upload>
              </div>
            )}

            <Button 
              type="primary" 
              loading={quoteAmount.isPending || uploadQuotationFile.isPending}
              onClick={handleQuote}
              disabled={!amount && !fileList.length}
            >
              Submit Quote
            </Button>
          </>
        )}

        {quotation?.amount && (
          <div className="flex items-center justify-between rounded-lg bg-[#12244a] px-4 py-3 text-white">
            <span className="text-xs font-bold">Quoted Amount</span>
            <span className="text-lg font-bold">Rs {(quotation.amount ?? 0).toLocaleString()}</span>
          </div>
        )}

        {quotation.file && (
          <Button 
            icon={<Download size={14} />} 
            loading={download.isPending} 
            onClick={() => download.mutate()}
          >
            Download File
          </Button>
        )}

        {status === "QUOTED" && isCreator && (
          <Button 
            type="primary" 
            icon={<Send size={14} />} 
            loading={sendToCustomer.isPending} 
            onClick={() => sendToCustomer.mutate(undefined, {
              onSuccess: () => {
                router.push(`/quotations/${id}`);
              }
            })} 
            className="bg-green-700! hover:bg-green-800!"
          >
            Send to Customer
          </Button>
        )}

        {status === "SENT TO CUSTOMER" && isCreator && (
          <div className="flex flex-col gap-2">
            <Button 
              type="primary" 
              loading={isStatusLoading("APPROVED")} 
              onClick={() => updateStatus.mutate("APPROVED")} 
              className="bg-green-700! hover:bg-green-800!"
            >
              Approve
            </Button>
            <Button 
              danger 
              loading={isStatusLoading("REJECTED")} 
              onClick={() => updateStatus.mutate("REJECTED")}
            >
              Reject
            </Button>
            <Button 
              loading={isStatusLoading("RE QUOTE")} 
              onClick={() => updateStatus.mutate("RE QUOTE")}
            >
              Re-Quote
            </Button>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default QuotationActionsCard;