import { Send } from "lucide-react";
import { Button } from "antd";
import { Quotation } from "../types/quotations.types";
import { useUser } from "@/features/auth/selectors/auth.selector";

interface Props {
  quotation?: Quotation;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface RowProps {
  label: string;
  value?: string;
}

const Row = ({ label, value }: RowProps) => (
  <div className="grid grid-cols-[140px_1fr] items-center border-b border-slate-200 px-4 py-2.5 last:border-b-0 dark:border-slate-700">
    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</span>
    <span className="text-xs font-semibold text-gray-800 dark:text-gray-100">{value ?? "—"}</span>
  </div>
);

const QuotationPreviewContent = ({ quotation, loading, onClose, onConfirm }: Props) => {
  const user = useUser();
  const customer = quotation?.customer;
  const product = quotation?.productType;
  const features = quotation?.features ?? [];
  const today = new Date().toLocaleDateString("en-GB");

  const rows: { label: string; value?: string; always?: boolean }[] = [
    { label: "Material", value: quotation?.material, always: true },
    { label: product?.name === "Label" ? "Die Size" : "Size", value: quotation?.size },
    { label: "Paper Type", value: quotation?.paperType },
    { label: "Category", value: quotation?.documentCategory },
    { label: "Quantity", value: quotation?.quantity?.toLocaleString(), always: true },
    { label: "Lead Time", value: quotation?.leadTime, always: true },
    { label: "Freight", value: quotation?.freightCharges, always: true },
  ].filter((r) => r.always || r.value !== undefined);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between border-b-2 border-[#12244a] pb-3 dark:border-slate-500">
        <div>
          <div className="text-lg font-extrabold uppercase text-[#12244a] dark:text-white">ULTRACOAT</div>
          <div className="text-[11px] text-gray-400">Marketing & Printing Solutions</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full bg-green-700 px-3 py-0.5 text-[10px] font-bold uppercase text-white">Quotation</span>
          <span className="text-[11px] text-gray-400">{today}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-[10px] font-bold uppercase text-gray-400">From:</div>
          <div className="text-xs font-bold text-gray-800 dark:text-gray-100">{user?.name ?? "—"}</div>
          <div className="text-[11px] text-gray-400">{user?.email ?? "—"}</div>
          <div className="text-[11px] text-gray-400">{user?.phone ?? "—"}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase text-gray-400">To:</div>
          <div className="text-xs font-bold text-gray-800 dark:text-gray-100">{customer?.company ?? customer?.name ?? "—"}</div>
          {customer?.name && <div className="text-[11px] text-gray-400">Attn: {customer.name}</div>}
          {customer?.phone && <div className="text-[11px] text-gray-400">{customer.phone}</div>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase text-gray-400">Product Type:</span>
        <span className="rounded-full bg-[#12244a] px-3 py-0.5 text-[10px] font-bold text-white">{product?.name ?? "—"}</span>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-transparent">
        {rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.value} />
        ))}
      </div>

      {features.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase text-gray-400 dark:border-slate-700 dark:bg-transparent">Features</div>
          {features.map((f) => (
            <div key={f.id} className="border-b border-slate-200 px-4 py-2 last:border-b-0 dark:border-slate-700">
              <div className="text-xs font-semibold text-gray-800 dark:text-gray-100">{f.name}</div>
              {(f.optionGroups ?? []).map((g) => (
                <div key={g.id} className="text-[11px] text-gray-400">
                  {g.label}: {(g.values ?? []).map((v) => v.label ?? v.value).join(", ")}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {quotation?.additionalNotes && (
        <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <div className="text-[10px] font-bold uppercase text-gray-400">Notes</div>
          <div className="mt-1 whitespace-pre-wrap text-xs text-gray-700 dark:text-gray-200">{quotation.additionalNotes}</div>
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
        <Button onClick={onClose}>Close</Button>
        <Button type="primary" icon={<Send size={14} />} loading={loading} onClick={onConfirm} >Submit</Button>
      </div>
    </div>
  );
};

export default QuotationPreviewContent;