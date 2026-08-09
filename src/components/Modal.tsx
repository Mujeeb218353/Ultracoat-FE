import { Modal } from "antd";

interface ModalComponentProps {
  open: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  width?: number;
  centered?: boolean;
  className?: string;
}


const ModalComponent = ({ open, onCancel, children, title, description, icon, footer = null, width = 640, centered = true, className = '' }: ModalComponentProps) => {

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={footer ? footer : null}   
      centered={centered}
      destroyOnHidden
      width={width}
      className={`p-0! ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-semibold m-0 leading-tight">
            {title}
          </h2>
          <p className="text-xs text-gray-500 m-0 mt-0.5">
            {description}
          </p>
        </div>
      </div>
      {children}
    </Modal>
  );
};

export default ModalComponent;