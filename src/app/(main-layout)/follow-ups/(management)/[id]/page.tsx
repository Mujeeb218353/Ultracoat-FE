"use client";

import Badge from "@/components/Badge";
import DetailHeader from "@/components/DetailHeader";
import Field from "@/components/Field";
import FollowUpsCard from "@/features/follow-ups/components/FollowUpCard";
import useFollowUpsWithQuotation from "@/features/follow-ups/hooks/use-follow-ups-by-quotation-id";
import SectionCard from "@/features/quotations/components/SectionCard";
import { Skeleton } from "antd";
import dayjs from "dayjs";
import { Box, Building2, Tag } from "lucide-react";
import { useParams } from "next/navigation";

const FollowUpsByQuotationPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: quotation, isPending } = useFollowUpsWithQuotation(id);

  if (isPending) return <Skeleton active className="p-6" />;
  if (!quotation) return <div className="flex flex-col gap-4">
        <DetailHeader backHref="/follow-ups" title="Follow-ups" />
        <div className="p-6 text-sm text-gray-500">Follow-ups not found.</div>
      </div>;

  const customer = quotation.customerDetail;
  const product = quotation.productDetail;
  const features = quotation.quotationFeatures ?? [];
  const followUps = quotation.followUps ?? [];

  return (
    <div className="flex flex-col gap-4">
      <DetailHeader
        backHref="/follow-ups"
        title="Follow-ups"
        subtitle={`${customer?.company ?? "-"} · ${followUps.length} follow-up(s)`}
        actions={quotation.status && <Badge kind="status" value={quotation.status} />}
      />

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
    
        <div className="w-full sm:w-100 flex flex-col gap-4">
          <FollowUpsCard quotationId={quotation.id ?? ""} followUps={followUps} />
        </div>
      </div>
    </div>
  );
};
export default FollowUpsByQuotationPage;