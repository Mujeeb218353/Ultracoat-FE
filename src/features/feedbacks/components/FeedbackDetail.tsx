"use client";

import DetailHeader from "@/components/DetailHeader";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Building2, MessageSquare, Star } from "lucide-react";
import { Button, Form, Input, Rate, Skeleton, Tag } from "antd";
import dayjs from "dayjs";
import Field from "@/components/Field";
import SectionCard from "@/features/quotations/components/SectionCard";
import useFeedbackById from "../hooks/use-feedback-by-id";
import useUpdateFeedback from "../hooks/use-update-feedback";
import { Rating, UpdateFeedbackPayload } from "../types/feedback.types";

const RATING_FIELDS: { key: keyof Rating; label: string }[] = [
  { key: "quality", label: "Quality" },
  { key: "time", label: "Time" },
  { key: "price", label: "Price" },
  { key: "communication", label: "Communication" },
  { key: "service", label: "Service" },
];

const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<UpdateFeedbackPayload>();
  const { data: feedback, isPending } = useFeedbackById(id);
  const updateFeedback = useUpdateFeedback();

  useEffect(() => {
    if (!feedback) return;
    form.setFieldsValue({
      comment: feedback.comment ?? "",
      ratings: {
        quality: feedback.ratings?.quality ?? 0,
        time: feedback.ratings?.time ?? 0,
        price: feedback.ratings?.price ?? 0,
        communication: feedback.ratings?.communication ?? 0,
        service: feedback.ratings?.service ?? 0,
      },
    });
  }, [feedback, form]);

  if (isPending) return <Skeleton active className="p-6" />;
  if (!feedback) return <div className="flex flex-col gap-4">
        <DetailHeader backHref="/feedbacks" title="Customer Feedback" />
        <div className="p-6 text-sm text-gray-500">Feedback not found.</div>
      </div>;

  const customer = feedback.quotation?.customerDetail;
  const quotation = feedback.quotation;
  const isQuotationRejected = quotation?.status === "REJECTED";

  const handleSubmit = (payload: UpdateFeedbackPayload) => {
    updateFeedback.mutate({ id, payload });
  };

  return (
    <div className="flex flex-col gap-4">
      <DetailHeader
        backHref="/feedbacks"
        title="Customer Feedback"
        subtitle={`Received: ${feedback.createdAt ? dayjs(feedback.createdAt).format("DD MMM YYYY, hh:mm A") : "-"}`}
        actions={<Tag color={feedback.status === "SUBMITTED" ? "green" : "orange"}>{feedback.status ?? "Unknown"}</Tag>}
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
              <Field label="Product Type" value={quotation?.productDetail?.name} />
              <Field label="Quotation Status" value={quotation?.status} />
              <Field label="Material" value={quotation?.material} />
              <Field label="Size" value={quotation?.size} />
              <Field label="Quantity" value={quotation?.quantity?.toLocaleString()} />
            </div>
          </SectionCard>

          <SectionCard
            icon={MessageSquare}
            title="Feedback"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            {isQuotationRejected ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Feedback cannot be submitted or updated because this quotation was rejected.
              </p>
            ) : (
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="comment" label="Customer Comment">
                  <Input.TextArea rows={4} placeholder="No comment provided" />
                </Form.Item>

                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {RATING_FIELDS.map(({ key, label }) => (
                    <Form.Item
                      key={key}
                      name={["ratings", key]}
                      label={label}
                      rules={[{ required: true, message: `Please rate ${label.toLowerCase()}` }]}
                      className="mb-2"
                    >
                      <Rate count={5} />
                    </Form.Item>
                  ))}
                </div>

                <Button type="primary" htmlType="submit" loading={updateFeedback.isPending}>
                  Update Feedback
                </Button>
              </Form>
            )}
          </SectionCard>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-100">
          <SectionCard
            icon={Star}
            title="Rating Summary"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-500">Average Rating</span>
              <span className="font-semibold text-amber-600">
                {Number(feedback.avgRating ?? 0).toFixed(1)} / 5
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {RATING_FIELDS.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold">{feedback.ratings?.[key] ?? 0} / 5</span>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard
            icon={Star}
            title="Feedback Record"
            className="w-full!"
            headerClassName="bg-[#001529] rounded-t-lg text-white"
          >
            <div className="flex flex-col gap-4">
              {[
                { title: "Created By", person: feedback.creator },
                { title: "Updated By", person: feedback.updater },
              ].map(({ title, person }) => (
                <div key={title} className="flex flex-col gap-3 not-last:border-b not-last:border-gray-200 not-last:pb-4 dark:not-last:border-white/10">
                  <Field label={title} value={person?.name} />
                  <div className="flex flex-col gap-3">
                    <Field label="Role" value={person?.role} />
                    <Field label="Phone" value={person?.phone} />
                    <Field label="Email" value={person?.email} />
                    <Field label="Location" value={person?.location} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;
