import { Layers } from "lucide-react";
import { Form, Select, Input } from "antd";
import { useMemo } from "react";
import SectionCard from "./SectionCard";
import useDieSizesList from "@/features/sizes/hooks/use-sizes-list";
import { SPEC_FIELDS, SPEC_OPTIONS } from "../constants/quotation.constants";

interface Props {
  productName?: string;
}

const INPUT_TRIGGER_VALUES = ["ORDINARY", "OTHER", "MANUAL"];

const SpecificationsSection = ({ productName }: Props) => {
  const form = Form.useFormInstance();
  const specs = Form.useWatch("specs") ?? {};

  const isLabel = productName === "Label";
  const { data, isFetching } = useDieSizesList({ enabled: isLabel });
  const dieSizes = Array.isArray(data) ? data : [];

  const fields = useMemo(() => SPEC_FIELDS[productName ?? ""] ?? [], [productName]);

  const isOrdinary = productName === "Document" && String(specs.documentCategory ?? "").toLowerCase().includes("ordinary");

  const getOptions = (key: string) => isLabel && key === "size" ? Array.from(new Set(dieSizes.map((d) => d.name).filter(Boolean))).map((name) => ({ label: name, value: name as string })) : SPEC_OPTIONS[key] ?? [];

  const shouldShowInput = (key: string) => INPUT_TRIGGER_VALUES.includes(String(specs[key] ?? "").toUpperCase());

  return (
    <SectionCard icon={Layers} title={`${productName ?? ""} Specifications`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f) => (
          <Form.Item key={f.key} label={f.label} className="mb-0">
            <div className="flex gap-2">
              <Form.Item name={["specs", f.key]} noStyle rules={f.required ? [{ required: true, message: `${f.label} is required` }] : undefined}>
                <Select className="min-w-0 flex-1" loading={isLabel && f.key === "size" && isFetching} placeholder={`Select ${f.label.toLowerCase()}`} options={getOptions(f.key)} onChange={() => form.setFieldValue(["specs", `${f.key}Other`], undefined)} />
              </Form.Item>

              {shouldShowInput(f.key) && (
                <Form.Item name={["specs", `${f.key}Other`]} noStyle rules={[{ required: true, message: `Enter ${f.label.toLowerCase()}` }, ...(isOrdinary && f.key === "paperType" ? [{ pattern: /gsm/i, message: "Must contain GSM (e.g. 80 GSM)" }] : [])]}>
                  <Input className="min-w-0 flex-1" placeholder={`Enter ${f.label.toLowerCase()}`} />
                </Form.Item>
              )}
            </div>
          </Form.Item>
        ))}

        {isOrdinary && (
          <Form.Item name={["specs", "gsm"]} label="Paper Weight" rules={[{ required: true, message: "Paper weight is required" }, { pattern: /gsm/i, message: "Must contain GSM (e.g. 80 GSM)" }]} className="mb-0">
            <Input placeholder="e.g. 80 GSM" />
          </Form.Item>
        )}
      </div>
    </SectionCard>
  );
};

export default SpecificationsSection;