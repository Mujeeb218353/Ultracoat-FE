"use client";

import FormField from "@/components/FormField";
import { useCloseModal } from "@/features/modal/selectors/modal.selector";
import useProductsList from "@/features/products/hooks/use-products-list";
import { Button, Card, Form, Input, Select } from "antd";
import { GitBranch, Hash, Layers, ListChecks, Plus, Tag, Trash2, Type } from "lucide-react";
import { useMemo } from "react";
import useUpdateFeature from "../hooks/use-update-feature";
import { updateFeatureSchema } from "../schema/features.schema";
import { Feature, OptionFeatureGroup, OptionFeatureValue } from "../types/features.types";

interface UpdateFeatureFormProps {
  feature: Feature;
}

interface FeatureFormValues {
  id?: string;
  name: string;
  productId?: string | null;
  optionGroups: OptionFeatureGroup[];
}

const iconCls = "w-4 h-4 text-gray-400";

const UpdateFeatureForm = ({ feature }: UpdateFeatureFormProps) => {
  const [form] = Form.useForm<FeatureFormValues>();
  const closeModal = useCloseModal();
  const { mutate: updateFeature, isPending } = useUpdateFeature();
  const { data: products, refetch: fetchProducts } = useProductsList({ enabled: false });

  const initialValues = useMemo<FeatureFormValues>(() => {
    const idToValue: Record<string, string> = {};
    feature.optionGroups?.forEach((g) =>
      g.values?.forEach((v) => {
        if (v.id && v.value) idToValue[v.id] = v.value;
      }),
    );

    return {
      id: feature.id,
      name: feature.name ?? "",
      productId: feature.productDetail?.id ?? null,
      optionGroups: (feature.optionGroups ?? []).map((g) => ({
        id: g.id,
        label: g.label,
        dependsOnValueRef: g.dependsOnValueId ? idToValue[g.dependsOnValueId] ?? null : null,
        values: (g.values ?? []).map((v) => ({ id: v.id, label: v.label, value: v.value })),
      })),
    };
  }, [feature]);

  const watched = Form.useWatch("optionGroups", form);
  const optionGroups: OptionFeatureGroup[] = watched ?? initialValues.optionGroups;

  const productOptions = useMemo(() => {
    const list = Array.isArray(products) ? products.map((p) => ({ label: p.name, value: p.id })) : [];
    const current = feature.productDetail;
    if (current?.id && !list.some((o) => o.value === current.id)) {
      list.unshift({ label: current.name, value: current.id });
    }
    return list;
  }, [products, feature.productDetail]);

  const getDependencyOptions = (groupIndex: number) =>
    (optionGroups ?? []).slice(0, groupIndex).flatMap((g: OptionFeatureGroup) =>
      (g?.values ?? [])
        .filter((v: OptionFeatureValue) => v?.value)
        .map((v: OptionFeatureValue) => ({
          label: `${g.label || "Group"} → ${v.label || v.value}`,
          value: v.value,
        })),
    );

  const handleFinish = (values: FeatureFormValues) => {
    const payload = {
      ...values,
      optionGroups: (values.optionGroups ?? []).map((g: OptionFeatureGroup, gi: number) => ({
        ...g,
        sortOrder: gi + 1,
        dependsOnValueRef: g.dependsOnValueRef ?? null,
        values: (g.values ?? []).map((v: OptionFeatureValue, vi: number) => ({ ...v, sortOrder: vi + 1 })),
      })),
    };

    updateFeature(payload, {
      onSuccess: () => closeModal(),
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
      className="flex! flex-col! gap-2!"
      key={feature?.id}
    >
      <FormField name="id" hidden={true} />

      <FormField
        name="name"
        label="Feature Name"
        type="text"
        schema={updateFeatureSchema.shape.name}
        placeholder="Laptop Configuration"
        size="medium"
        required
        icon={<Tag className={`${iconCls} mr-1`} />}
      />

      <Form.Item label="Product Type" name="productId">
        <Select
          allowClear
          placeholder="None"
          suffixIcon={<ListChecks className={iconCls} />}
          options={productOptions}
          onOpenChange={(open) => {
            if (open && !products) fetchProducts();
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
                <Form.Item name={[gName, "id"]} hidden>
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[gName, "label"]}
                  label="Label"
                  rules={[{ required: true, whitespace: true, message: "Label is required" }]}
                >
                  <Input prefix={<Type className={iconCls} />} placeholder="e.g. Brand" />
                </Form.Item>

                <Form.Item name={[gName, "dependsOnValueRef"]} label="Depends On">
                  <Select
                    allowClear
                    placeholder="None"
                    suffixIcon={<GitBranch className={iconCls} />}
                    options={getDependencyOptions(gName)}
                  />
                </Form.Item>

                <Form.List name={[gName, "values"]}>
                  {(values, { add: addValue, remove: removeValue }) => (
                    <div className="flex flex-col gap-1">
                      {values.map(({ key: vKey, name: vName }) => (
                        <div key={vKey} className="flex items-start gap-2">
                          <Form.Item name={[vName, "id"]} hidden>
                            <Input />
                          </Form.Item>
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

            <Button type="dashed" icon={<Plus size={14} />} onClick={() => addGroup({ values: [{}] })}>
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
          Update Feature
        </Button>
      </div>
    </Form>
  );
};

export default UpdateFeatureForm;