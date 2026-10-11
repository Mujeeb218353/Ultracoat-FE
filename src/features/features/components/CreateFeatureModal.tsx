"use client";

import FormField from "@/components/FormField";
import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal } from "@/features/modal/selectors/modal.selector";
import useProductsList from "@/features/products/hooks/use-products-list";
import { Button, Card, Form, Input, Select } from "antd";
import {
    Box,
    GitBranch,
    Hash,
    Layers,
    Plus,
    Settings,
    Tag,
    Trash2,
    Type,
} from "lucide-react";
import useCreateFeature from "../hooks/use-create-feature";
import { createFeatureSchema } from "../schemas/features.schema";
import { OptionFeatureGroup, OptionFeatureValue, CreateFeaturePayloadRequest } from "../types/features.types";

const iconCls = "w-4 h-4 text-gray-400";

const CreateFeatureModal = () => {
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const { data: products, refetch: fetchProducts } = useProductsList({ enabled: false });
  const { mutate: createFeature, isPending } = useCreateFeature();
  const [form] = Form.useForm();
  const optionGroups = Form.useWatch("optionGroups", form);

  const productOptions = Array.isArray(products) ? products.map((p) => ({ label: p.name, value: p.id })) : [];

  const getDependencyOptions = (groupIndex: number) => (optionGroups ?? []).slice(0, groupIndex).flatMap((g: OptionFeatureGroup) => (g?.values ?? []).filter((v: OptionFeatureValue) => v?.value).map((v: OptionFeatureValue) => ({ label: `${g.label || "Group"} → ${v.label || v.value}`, value: v.value })));

  const handleFinish = (values: CreateFeaturePayloadRequest) => {
    const payload = {
      ...values,
      optionGroups: (values.optionGroups ?? []).map((g: OptionFeatureGroup, gi: number) => ({
        ...g,
        sortOrder: gi + 1,
        dependsOnValueRef: g.dependsOnValueRef ?? null,
        values: (g.values ?? []).map((v: OptionFeatureValue, vi: number) => ({ ...v, sortOrder: vi + 1 })),
      })),
    };

    createFeature(payload, {
      onSuccess: () => {
        form.resetFields();
        closeModal();
      },
    });
  };

  return (
    <Modal
      open={activeModal === "CREATE_FEATURE"}
      onCancel={() => {
        form.resetFields();
        closeModal();
      }}
      title="Add Feature"
      description="Fill in the details below."
      icon={<Settings size={20} className="text-gray-400" />}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ isActive: true, optionGroups: [] }}
        className="flex! flex-col! gap-2!"
      >
        <FormField
          name="name"
          label="Feature Name"
          type="text"
          schema={createFeatureSchema.shape.name}
          placeholder="COLORSHIFT"
          size="small"
          required
          icon={<Tag className={`${iconCls} mr-1`} />}
        />

        <Form.Item 
         label="Product Type"
         name="productId"
         rules={[{ required: true, message: "Product type is required" }]}
        >
          <Select
            allowClear
            placeholder="None"
            suffixIcon={<Box className={iconCls} />}
            options={productOptions}
            onOpenChange={(open) => {
              if (open && !products) {
                fetchProducts();
              }
            }}
          />
       </Form.Item>


        <Form.List name="optionGroups">
          {(groups, { add: addGroup, remove: removeGroup }) => (
            <div className="flex flex-col gap-3">
              {groups.map(({ key, name: gName }) => (
                <Card
                  key={key}
                  size="small"
                  title={
                    <span className="flex items-center gap-2">
                      <Layers className={iconCls} /> Option Group {gName + 1}
                    </span>
                  }
                  extra={<Button type="text" danger icon={<Trash2 size={16} />} onClick={() => removeGroup(gName)} />}
                >
                  <div>
                    <Form.Item
                      name={[gName, "label"]}
                      label="Label"
                      rules={[{ required: true, whitespace: true, message: "Label is required" }]}
                    >
                      <Input prefix={<Type className={iconCls} />} placeholder="e.g. Brand" />
                    </Form.Item>
                  </div>

                  <Form.Item name={[gName, "dependsOnValueRef"]} label="Depends On">
                    <Select
                      allowClear
                      placeholder="None"
                      suffixIcon={<GitBranch className={iconCls} />}
                      options={getDependencyOptions(gName)}
                    />
                  </Form.Item>

                  <Form.List name={[gName, "values"]} initialValue={[{}]}>
                    {(values, { add: addValue, remove: removeValue }) => (
                      <div className="flex flex-col gap-1">
                        {values.map(({ key: vKey, name: vName }) => (
                          <div key={vKey} className="flex items-start gap-2">
                            <Form.Item
                              name={[vName, "label"]}
                              className="flex-1 mb-2!"
                              rules={[{ required: true, whitespace: true, message: "Label required" }]}
                            >
                              <Input prefix={<Type className={iconCls} />} placeholder="Label" />
                            </Form.Item>
                            <Form.Item
                              name={[vName, "value"]}
                              className="flex-1 mb-2!"
                              rules={[{ required: true, whitespace: true, message: "Value required" }]}
                            >
                              <Input prefix={<Hash className={iconCls} />} placeholder="Value" />
                            </Form.Item>
                            <Button
                              type="text"
                              danger
                              disabled={values.length === 1}
                              icon={<Trash2 size={16} />}
                              onClick={() => removeValue(vName)}
                            />
                          </div>
                        ))}
                        <Button type="dashed" icon={<Plus size={14} />} onClick={() => addValue()}>
                          Add Value
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Card>
              ))}

              <Button
                type="dashed"
                icon={<Plus size={14} />}
                onClick={() => addGroup({ selectionType: "SINGLE", values: [{}] })}
              >
                Add Option Group
              </Button>
            </div>
          )}
        </Form.List>

        <div className="w-full flex flex-col-reverse sm:flex-row items-center gap-4 justify-center sm:justify-end">
          <Button
            disabled={isPending}
            onClick={closeModal}
            className="dark:disabled:border-gray-600! dark:disabled:text-gray-400!"
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Create Feature
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateFeatureModal;