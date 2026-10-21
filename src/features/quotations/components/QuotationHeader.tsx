import { ArrowLeft, Eye, Send } from "lucide-react";
import { Button } from "antd";

interface Props {
  onBack: () => void;
  onPreview: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  submitting?: boolean;
};

const QuotationHeader = ({ onBack, onPreview, onSubmit, disabled, submitting }: Props) => { 
  return (
    <header className="sticky top-18 z-10 flex flex-col sm:flex-row gap-4 items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-transparent">
      <div className="flex items-center justify-between  gap-4">
        <div 
          className="cursor-pointer flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-r border-gray-200 dark:border-white/10 pr-2"
          onClick={onBack}
        >
          <ArrowLeft 
            size={14}
            className=""
          />
          Back
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-bold">Create Quotation</h1>
          <p className="text-xs text-gray-400">Fill in product specifications and submit to representative</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button icon={<Eye size={14} />} onClick={onPreview} disabled={disabled}>
          Preview
        </Button>
        <Button
          type="primary"
          icon={<Send size={14} />}
          onClick={onSubmit}
          disabled={disabled}
          loading={submitting}
        >
          Submit Quotation
        </Button>
      </div>
    </header>
  );
};

export default QuotationHeader;