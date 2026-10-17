import { Clock, Truck } from "lucide-react";
import { Form, Select } from "antd";
import SectionCard from "./SectionCard";
import { FREIGHT_CHARGES, LEAD_TIME_OPTIONS } from "../constants/quotation.constants";
import type { FreightCharges } from "../types/quotations.types";

interface FreightPickerProps {
  value?: FreightCharges;
  onChange?: (value: FreightCharges) => void;
}

const FreightPicker = ({ value, onChange }: FreightPickerProps) => (
  <div className="flex gap-2 justify-between">
    {FREIGHT_CHARGES.map((f) => (
      <button
        key={f}
        type="button"
        onClick={() => onChange?.(f)}
        className={`w-full flex items-center gap-1 rounded-lg border border-slate-300 dark:border-white/10 px-4 py-3 text-xs font-bold transition ${
          value === f
            ? "bg-[#001259] border-[#001259] hover:bg-blue-950 hover:border-blue-950 text-white"
            : "bg-white dark:bg-transparent"
        }`}
      >
        <Truck size={12} /> {f}
      </button>
    ))}
  </div>
);

const LeadTimeFreightSection = () => (
  <SectionCard icon={Clock} title="Lead Time & Freight">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Form.Item
        name="leadTime"
        label="Lead Time"
        rules={[{ required: true, message: "Lead time is required" }]}
        className="mb-0"
      >
        <Select className="w-full" placeholder="Select lead time" options={LEAD_TIME_OPTIONS} />
      </Form.Item>

      <Form.Item
        name="freightCharges"
        label="Freight Charges"
        rules={[{ required: true, message: "Freight is required" }]}
        className="mb-0"
      >
        <FreightPicker />
      </Form.Item>
    </div>
  </SectionCard>
);

export default LeadTimeFreightSection;