import { Hash } from "lucide-react";
import { Form, Input } from "antd";
import SectionCard from "./SectionCard";

const NotesSection = () => (
  <SectionCard icon={Hash} title="Additional Notes">
    <Form.Item name="additionalNotes" className="mb-0">
      <Input.TextArea
        rows={3}
        maxLength={1000}
        showCount
        placeholder="Special instructions, packaging requirements, or any other remarks..."
      />
    </Form.Item>
  </SectionCard>
);

export default NotesSection;