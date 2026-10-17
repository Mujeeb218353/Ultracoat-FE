import { Eye, Save } from "lucide-react";
import { Button } from "antd";

interface Props {
  onSaveDraft: () => void;
  onPreview: () => void;
  disabled?: boolean;
  savingDraft?: boolean;
}

const FooterActions = ({ onSaveDraft, onPreview, disabled, savingDraft }: Props) => (
  <div className="flex justify-end gap-3 pb-6">
    <Button icon={<Save size={14} />} onClick={onSaveDraft} loading={savingDraft}>
      Save Draft
    </Button>
    <Button type="primary" icon={<Eye size={14} />} onClick={onPreview} disabled={disabled}>
      Preview & Submit
    </Button>
  </div>
);

export default FooterActions;