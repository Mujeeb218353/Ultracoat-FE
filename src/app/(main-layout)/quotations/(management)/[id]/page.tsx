"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, Box, Tag, Phone, Mail, UserCheck, Calendar } from "lucide-react";
import { Skeleton } from "antd";
import SectionCard from "@/features/quotations/components/SectionCard";
import QuotationActionsCard from "@/features/quotations/components/QuotationActionsCard";
import useQuotationById from "@/features/quotations/hooks/use-quotation-by-id";
import Badge from "@/components/Badge";
import dayjs from "dayjs";

interface FieldProps {
  label: string;
  value?: string | number;
  className?: string;
}


const Field = ({ label, value, className }: FieldProps) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-gray-400">{label}</span>
    <span className={`font-semibold text-gray-800 dark:text-gray-100 ${className || ""}`}>{value ?? "—"}</span>
  </div>
);

const QuotationDetailPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: quotation, isPending } = useQuotationById(id);

  if (isPending) return <Skeleton active className="p-6" />;
  if (!quotation) return <div className="p-6 text-sm text-gray-500">Quotation not found.</div>;

  const customer = quotation.customerDetail;
  const creator = quotation.creator;
  const product = quotation.productDetail;
  const features = quotation.quotationFeatures ?? [];

  return (
    <div className="flex flex-col gap-4">
      <header className="sticky top-18 z-10 flex flex-col sm:flex-row gap-4 items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-transparent">
        <div className="flex items-center justify-between gap-4">
          <div
            className="cursor-pointer flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-r border-gray-200 dark:border-white/10 pr-2"
            onClick={() => router.push("/quotations")}
          >
            <ArrowLeft size={14} />
            Back
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-bold">{quotation.id?.slice(0, 8)}</h1>
              {quotation.status && (
                <Badge kind="status" value={quotation.status} />
              )}
            </div>
            <p className="text-xs text-gray-400">
              Request Date: {quotation.createdAt?.slice(0, 10)}
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row justify-between gap-4 p-4">
        <div className="w-full flex flex-col gap-4">
          <SectionCard 
            icon={Building2} 
            title="Customer Information"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Field label="Company Name" value={customer?.company} />
              <Field label="Customer Representative" value={customer?.name} />
              <Field label="Phone" value={customer?.phone} />
              <Field label="Email" value={customer?.email} />
              <Field label="Designation" value={customer?.designation} />
              <Field label="Registration Date" value={dayjs(customer?.createdAt).format("YYYY-MM-DD")} />
              <Field label="Location" value={customer?.location} className="block!" />
              <Field label="Assigned Sales Representative" value={creator?.name} />
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-400">Product Type</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  {product?.name ?? "—"}
                </span>
              </div>
            </div>
          </SectionCard>

          <SectionCard 
            icon={Box} 
            title="Requirement Details"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <Field label="Material" value={quotation.material} />
              <Field label="Size" value={quotation.size} />
              <Field label="Paper Type" value={quotation.paperType} />
              <Field label="Category" value={quotation.documentCategory} />
              <Field label="Quantity" value={quotation.quantity?.toLocaleString()} />
              <Field label="Lead Time" value={quotation.leadTime} />
              <Field label="Freight" value={quotation.freightCharges} />
            </div>

            {features.length > 0 && (
              <div className="text-[10px] mt-5 flex flex-col gap-2">
                <span className="text-gray-500 dark:text-gray-400">Selected Features</span>
                <div className="flex flex-col gap-2">
                  {features.map((f) => {
                    const values = (f.selectedValues ?? []).map((v) => v.optionValue).filter((v) => !!v);
                    return (
                      <div key={f.id} className="flex flex-wrap items-center gap-2">
                        <span className="flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 font-bold text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          <Tag size={12} /> {f.feature?.name}
                        </span>
                        {values.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            {values.map((v) => (
                              <span
                                key={v.id}
                                className="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1 font-bold uppercase text-gray-700 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200"
                              >
                                {v.label ?? v.value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {quotation.additionalNotes && (
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-gray-400">Additional Remarks</span>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800/50">{quotation.additionalNotes}</div>
              </div>
            )}
          </SectionCard>
        </div>

        <div>
          <QuotationActionsCard quotation={quotation} />
        </div>
      </div>
    </div>
  );
};

export default QuotationDetailPage;