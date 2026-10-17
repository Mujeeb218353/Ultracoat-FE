import { Layers } from "lucide-react";
import { Form, Select, Input } from "antd";
import { useEffect, useMemo } from "react";
import SectionCard from "./SectionCard";
import useDieSizesList from "@/features/sizes/hooks/use-sizes-list";
import { SPEC_FIELDS, SPEC_OPTIONS } from "../constants/quotation.constants";

interface Props {
  productName?: string;
}

const INPUT_TRIGGER_VALUES = ["ORDINARY", "OTHER", "MANUAL"];

const SpecificationsSection = ({ productName }: Props) => {
  const form = Form.useFormInstance();

  const category = Form.useWatch(["specs", "documentCategory"]);
  const material = Form.useWatch(["specs", "material"]);
  const size = Form.useWatch(["specs", "size"]);
  const quantity = Form.useWatch(["specs", "quantity"]);
  const paperType = Form.useWatch(["specs", "paperType"]);

  const isLabel = productName === "Label";
  const { data, isFetching } = useDieSizesList({ enabled: isLabel });

  const dieSizes = Array.isArray(data) ? data : [];

  // 1. Wrap fields computation inside useMemo to keep its array reference stable
  const fields = useMemo(() => {
    return SPEC_FIELDS[productName ?? ""] ?? [];
  }, [productName]);

  const isOrdinary =
    productName === "Document" &&
    String(category ?? "").toLowerCase().includes("ordinary");

  const selectedValues: Record<string, unknown> = {
    material,
    size,
    quantity,
    paperType,
  };

  useEffect(() => {
    const currentValues: Record<string, unknown> = {
      material,
      size,
      quantity,
      paperType,
    };

    fields.forEach((field) => {
      const value = currentValues[field.key];

      if (INPUT_TRIGGER_VALUES.includes(String(value ?? "").toUpperCase())) {
        form.setFieldValue(["specs", `${field.key}Other`], undefined);
      }
    });
    // 2. React can now safely track fields since useMemo prevents reference changes
  }, [material, size, quantity, paperType, form, fields]);

  const getOptions = (key: string) =>
    isLabel && key === "size"
      ? Array.from(new Set(dieSizes.map((d) => d.name).filter(Boolean))).map(
          (name) => ({ label: name, value: name as string }),
        )
      : SPEC_OPTIONS[key] ?? [];

  const shouldShowInput = (key: string) =>
    INPUT_TRIGGER_VALUES.includes(
      String(selectedValues[key] ?? "").toUpperCase(),
    );

  return (
    <SectionCard
      icon={Layers}
      title={`${productName ?? ""} Specifications`}
    >
      <div className="grid grid-cols-3 gap-4">
        {fields.map((f) => (
          <Form.Item
            key={f.key}
            label={f.label}
            className="mb-0"
          >
            <div className="flex gap-2">
              <Form.Item
                name={["specs", f.key]}
                noStyle
                rules={
                  f.required
                    ? [{ required: true, message: `${f.label} is required` }]
                    : undefined
                }
              >
                <Select
                  className="min-w-0 flex-1"
                  loading={isLabel && f.key === "size" && isFetching}
                  placeholder={`Select ${f.label.toLowerCase()}`}
                  options={getOptions(f.key)}
                />
              </Form.Item>

              {shouldShowInput(f.key) && (
                <Form.Item
                  name={["specs", `${f.key}Other`]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: `Enter ${f.label.toLowerCase()}`,
                    },
                    ...(isOrdinary && f.key === "paperType"
                      ? [
                          {
                            pattern: /gsm/i,
                            message: "Must contain GSM (e.g. 80 GSM)",
                          },
                        ]
                      : []),
                  ]}
                >
                  <Input
                    className="min-w-0 flex-1"
                    placeholder={`Enter ${f.label.toLowerCase()}`}
                  />
                </Form.Item>
              )}
            </div>
          </Form.Item>
        ))}

        {isOrdinary && (
          <Form.Item
            name={["specs", "gsm"]}
            label="Paper Weight"
            rules={[
              { required: true, message: "Paper weight is required" },
              {
                pattern: /gsm/i,
                message: "Must contain GSM (e.g. 80 GSM)",
              },
            ]}
            className="mb-0"
          >
            <Input placeholder="e.g. 80 GSM" />
          </Form.Item>
        )}
      </div>
    </SectionCard>
  );
};

export default SpecificationsSection;
