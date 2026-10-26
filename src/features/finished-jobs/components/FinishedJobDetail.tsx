"use client";

import DetailHeader from "@/components/DetailHeader";
import SectionCard from "@/features/quotations/components/SectionCard";
import useFinishedJobById from "../hooks/use-finished-job-by-id";
import { useParams } from "next/navigation";
import { Building2, Box, Calendar, Clock3, Download, Star, Tag } from "lucide-react";
import { Button, Skeleton } from "antd";
import dayjs from "dayjs";
import Field from "@/components/Field";
import useDownloadQuotationFile from "@/features/quotations/hooks/use-download-quotation-file";

const FinishedJobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: job, isPending } = useFinishedJobById(id);
  const download = useDownloadQuotationFile(id, job?.feedback?.quotation?.file ?? "quotation.pdf");

  if (isPending) return <Skeleton active className="p-6" />;
  if (!job) return (
    <div className="flex flex-col gap-4">
      <DetailHeader backHref="/finished-jobs" title="Finished Job" />
      <div className="p-6 text-sm text-gray-500">Finished job not found.</div>
    </div>
  );

  const feedback = job.feedback;
  const quotation = feedback?.quotation;
  const customer = quotation?.customerDetail;
  const features = quotation?.quotationFeatures ?? [];
  const ratings = Object.entries(feedback?.ratings ?? {});

  return (
    <div className="flex flex-col gap-4">
      <DetailHeader
        backHref="/finished-jobs"
        title="Finished Job"
        subtitle={`Completed: ${feedback?.updatedAt ? dayjs(feedback.updatedAt).format("DD MMM YYYY, hh:mm A") : "—"}`}
      />

      <div className="flex flex-col justify-between gap-4 p-4 lg:flex-row">
        <div className="flex w-full flex-col gap-4">
          <SectionCard
            icon={Building2}
            title="Customer Information"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Field label="Company Name" value={customer?.company} />
              <Field label="Customer Representative" value={customer?.name} />
              <Field label="Phone" value={customer?.phone} />
              <Field label="Email" value={customer?.email} />
              <Field label="Designation" value={customer?.designation} />
              <Field label="Location" value={customer?.location} />
            </div>
          </SectionCard>

          <SectionCard
            icon={Box}
            title="Job Details"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Field label="Product Type" value={quotation?.productDetail?.name} />
              <Field label="Quotation Status" value={quotation?.status} />
              <Field label="Material" value={quotation?.material} />
              <Field label="Size" value={quotation?.size} />
              <Field label="Paper Type" value={quotation?.paperType} />
              <Field label="Category" value={quotation?.documentCategory} />
              <Field label="Quantity" value={quotation?.quantity?.toLocaleString()} />
              <Field label="Lead Time" value={quotation?.leadTime} />
              <Field label="Freight" value={quotation?.freightCharges} />
              <Field label="Amount" value={quotation?.amount != null ? quotation.amount.toLocaleString() : undefined} />
              <Field label="Duration" value={job.timeDuration} />
              <Field
                label="Request Date"
                value={quotation?.createdAt ? dayjs(quotation.createdAt).format("DD MMM YYYY, hh:mm A") : undefined}
              />
              {quotation?.file && (
                <Field label="File">
                  <Button
                    icon={<Download size={14} />}
                    loading={download.isPending}
                    onClick={() => download.mutate()}
                    className="w-fit"
                  >
                    Download File
                  </Button>
                </Field>
              )}
            </div>

            {features.length > 0 && (
              <div className="mt-5 flex flex-col gap-2">
                <span className="text-gray-500 dark:text-gray-400">Selected Features</span>
                {features.map((feature) => (
                  <div key={feature.id} className="flex flex-wrap items-center gap-2">
                    <span className="flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      <Tag size={12} /> {feature.feature?.name}
                    </span>
                    {(feature.selectedValues ?? []).map(({ id: valueId, optionValue }) => (
                      <span
                        key={valueId}
                        className="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-bold uppercase text-gray-700 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200"
                      >
                        {optionValue?.label ?? optionValue?.value}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {quotation?.additionalNotes && (
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-gray-400">Additional Remarks</span>
                <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
                  {quotation.additionalNotes}
                </p>
              </div>
            )}
          </SectionCard>

          <SectionCard
            icon={Clock3}
            title="Project Timeline"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            {job.projectTimeLine?.length ? (
              <ol>
                {job.projectTimeLine.map((event, index) => (
                  <li key={`${event.createdAt}-${index}`} className="relative flex gap-3 pb-5 last:pb-0">
                    <div className="relative flex w-4 shrink-0 justify-center">
                      {index < job.projectTimeLine!.length - 1 && (
                        <span className="absolute top-4 h-full w-px bg-gray-300 dark:bg-gray-600" />
                      )}
                      <Calendar size={15} className="relative z-10 mt-0.5 shrink-0 bg-white text-gray-400 dark:bg-[#001529]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{event.message}</span>
                      <span className="text-xs text-gray-500">
                        {dayjs(event.createdAt).format("DD MMM YYYY, hh:mm A")}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-400">No timeline available.</p>
            )}
          </SectionCard>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-100">
          <SectionCard
            icon={Star}
            title="Customer Feedback"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-500">Average Rating</span>
              <span className="font-semibold text-amber-600">
                {Number(feedback?.avgRating ?? 0).toFixed(1)} / 5
              </span>
            </div>
            {ratings.length > 0 && (
              <div className="flex flex-col gap-3">
                {ratings.map(([label, rating]) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="capitalize text-gray-500">{label}</span>
                    <span className="font-semibold">{rating} / 5</span>
                  </div>
                ))}
              </div>
            )}
            {feedback?.comment && (
              <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
                {feedback.comment}
              </p>
            )}
            {!feedback && <p className="text-sm text-gray-400">No feedback submitted.</p>}
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default FinishedJobDetail;
