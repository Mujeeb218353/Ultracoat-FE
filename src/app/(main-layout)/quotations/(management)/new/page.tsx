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
import Modal from "@/components/Modal";
import { useOpenModal, useCloseModal, useActiveModal } from "@/features/modal/selectors/modal.selector";
import QuotationPreviewModal from "@/features/quotations/components/QuotationPreviewModal";
import { useMemo } from "react";
import buildPreviewQuotation from "@/features/quotations/utils/build.preview.quotation";
import useCustomersList from "@/features/customers/hooks/use-customer-list";
import useFeaturesList from "@/features/features/hooks/use-features-list";
import { CustomersResponse } from "@/features/customers/types/customers.types";
import { Feature } from "@/features/features/types/features.types";

const CreateQuotationPage = () => {
  const router = useRouter();

  const openModal = useOpenModal();
  const closeModal = useCloseModal();
  const activeModal = useActiveModal();

  const [form] = Form.useForm<QuotationFormState>();
  const values = Form.useWatch([], form);

  const { mutate: createQuotation, isPending: loading } = useCreateQuotation();

  const productId = Form.useWatch("productId", form);
  const { data: products } = useProductsList();
  const selectedProduct = Array.isArray(products) ? products.find((p) => p.id === productId) : undefined;

  const customerId = Form.useWatch("customerId", form);
  const { data: customersData } = useCustomersList({ enabled: false });
  const rawCustomersData = customersData as CustomersResponse | undefined;

  const { data: featuresData } = useFeaturesList({ enabled: !!productId });
  const rawFeaturesData = featuresData as { features: Feature[] } | undefined;

  const selectedCustomer = rawCustomersData?.customers.find((c) => c.id === customerId);
  const features = useMemo(() => rawFeaturesData?.features ?? [], [rawFeaturesData]);

  const handleValuesChange = (changed: Partial<QuotationFormState>) => {
    if (changed.productId) form.setFieldsValue({ specs: {}, features: [] });
  };

  const previewQuotation = useMemo(() => {
    return values ? buildPreviewQuotation(values, selectedProduct, selectedCustomer, features) : undefined
  }, [values, selectedProduct, selectedCustomer, features]);

  const openPreview = () => {
    form.validateFields().then(() => openModal("PREVIEW_QUOTATION")).catch(() => {});
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
      size: values.specs?.sizeOther ?? values.specs?.size,
      paperType: values.specs?.paperTypeOther ?? values.specs?.paperType,
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
        onPreview={openPreview}
        onSubmit={() => form.submit()}
        submitting={loading}
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

        <Form.Item className="mb-0 w-sm sm:w-lg xl:w-4xl flex items-center justify-end gap-2">
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

      <Modal
        open={activeModal === "PREVIEW_QUOTATION"}
        onCancel={closeModal}
        title="Quotation Preview"
        description="This is a preview of the quotation before submission."
        icon={<Eye size={14} />}
        width={800}
        centered={false}
      > 
        <QuotationPreviewModal
          quotation={previewQuotation}
          loading={loading}
          onClose={closeModal}
          onConfirm={closeModal}
        />
      </Modal>
    </Form>
  );
};

export default CreateQuotationPage;