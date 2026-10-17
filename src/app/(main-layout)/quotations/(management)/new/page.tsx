"use client";

import { useRouter } from "next/navigation";
import { Form, Button } from "antd";
import CreateQuotationHeader from "@/features/quotations/components/QuotationHeader";
import CustomerSection from "@/features/quotations/components/CustomerSection";
import ProductSection from "@/features/quotations/components/ProductTypeSection";
import SpecificationsSection from "@/features/quotations/components/SpecificationsSection";
import useProductsList from "@/features/products/hooks/use-products-list";
import {
  CreateQuotationPayload,
  QuotationFormState,
  initialQuotationForm,
} from "@/features/quotations/types/quotations.types";
import FeaturesSection from "@/features/quotations/components/FeaturesSection";
import LeadTimeSection from "@/features/quotations/components/LeadTimeFreightSection";
import NotesSection from "@/features/quotations/components/NotesSection";
import { Eye } from "lucide-react";
import useCreateQuotation from "@/features/quotations/hooks/use-create-quotation";

const getQuantity = (value: string | number | undefined) => {

  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseInt(value.replace(/[,\s]/g, ""), 10);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;

}

const CreateQuotationPage = () => {
  const router = useRouter();
  const [form] = Form.useForm<QuotationFormState>();
  const { mutate: createQuotation, isPending: loading } = useCreateQuotation();

  const productId = Form.useWatch("productId", form);

  const { data: products } = useProductsList();
  const selectedProduct = Array.isArray(products) ? products.find((p) => p.id === productId) : undefined;

  const handleValuesChange = (changed: Partial<QuotationFormState>) => {
    if (changed.productId) form.setFieldsValue({ specs: {}, features: [] });
  };

  const handleFinish = (values: QuotationFormState) => {

    const payload: CreateQuotationPayload = {
      customer: values.customerId!,
      productType: values.productId!,
      features: (values.features ?? []).map((f) => ({
        featureId: f.featureId,
        optionValueIds: Object.values(f.options).flat(),
      })),
      material: values.specs?.material,
      size: values.specs?.size,
      paperType: values.specs?.paperType,
      documentCategory: values.specs?.documentCategory,
      quantity: parseInt(String(values.specs?.quantityOther ?? values.specs?.quantity ?? 0).replace(/[,\s]/g, ""), 10),
      leadTime: values.leadTime,
      freightCharges: values.freightCharges!,
      additionalNotes: values.additionalNotes || undefined,
    };
    console.log(values, payload)

    createQuotation(payload, {
      onSuccess: () => {
        router.push(`/quotations`);
      }
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      initialValues={initialQuotationForm}
      className="flex flex-col gap-4"
    >
      <CreateQuotationHeader
        onBack={() => router.push("/quotations")}
        onPreview={() => {}}
        onSubmit={() => form.submit()}
        submitting={false}
      />

      <div className="min-w-xs flex flex-col justify-center items-center gap-4 p-4">
        <Form.Item
          name="customerId"
          rules={[{ required: true, message: "Select a customer" }]}
          className="mb-0"
        >
          <CustomerSection />
        </Form.Item>

        <Form.Item
          name="productId"
          rules={[{ required: true, message: "Select a product" }]}
          className="mb-0"
        >
          <ProductSection />
        </Form.Item>

        {selectedProduct && (
          <SpecificationsSection productName={selectedProduct.name} />
        )}

        {selectedProduct && (
          <Form.Item name="features" className="mb-0">
            <FeaturesSection productId={selectedProduct.id} />
          </Form.Item>
        )}
   
        {selectedProduct && (
          <Form.Item name="leadTime" className="mb-0">
            <LeadTimeSection />
          </Form.Item>
        )}

        <Form.Item name="additionalNotes" className="mb-0">
          <NotesSection />
        </Form.Item>

        <Form.Item className="mb-0 w-4xl flex items-center justify-end gap-2">
          <Button 
            icon={<Eye size={14} />} 
            onClick={() => {}} 
            className="mr-2 "
          >
            Preview
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
          >
            Submit Quotation
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateQuotationPage;