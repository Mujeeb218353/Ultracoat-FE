import { useEffect } from "react";
import { DatePicker, Form, Input, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";
import Modal from "@/components/Modal"; 
import useCreateFollowUp from "../hooks/use-create-follow-up";
import useUpdateFollowUp from "../hooks/use-update-follow-up";
import { createFollowUpSchema, updateFollowUpSchema } from "../schemas/follow-up.schema";
import {
  FollowUp,
  CreateFollowUpPayload,
  UpdateFollowUpPayload,
} from "../types/follow-ups.types";
import { Pencil, Plus } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  quotationId: string;
  followUp?: FollowUp;
};

interface FormValues {
  purpose: string;
  remarks: string;
  nextFollowUpDate?: Dayjs;
};

const FollowUpModal = ({ open, onClose, quotationId, followUp }: Props) => {
  const [form] = Form.useForm<FormValues>();
  const isEdit = !!followUp;

  const create = useCreateFollowUp();
  const update = useUpdateFollowUp();
  const isPending = create.isPending || update.isPending;

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue({
      purpose: followUp?.purpose,
      remarks: followUp?.remarks,
      nextFollowUpDate: followUp?.nextFollowUpDate ? dayjs(followUp.nextFollowUpDate) : undefined,
    });
  }, [open, followUp, form]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleOk = () => {
    const values = form.getFieldsValue();

    const data = {
      purpose: values.purpose,
      remarks: values.remarks,
      nextFollowUpDate: values.nextFollowUpDate?.toISOString(),
    };

    const result = isEdit ? updateFollowUpSchema.safeParse({ ...data, id: followUp?.id }) : createFollowUpSchema.safeParse({ ...data, quotationId });

    if (!result.success) {
      form.setFields(
        result.error.issues.map((i) => ({
          name: String(i.path[0]) as keyof FormValues,
          errors: [i.message],
        }))
      );
      return;
    }

    const opts = { onSuccess: handleClose };

    if (isEdit) update.mutate(result.data as UpdateFollowUpPayload, opts);
    else create.mutate(result.data as CreateFollowUpPayload, opts);
  };

  return (
    <Modal
      title={isEdit ? "Update Follow-up" : "Add Follow-up"}
      open={open}
      onCancel={handleClose}
      loading={isPending}
      icon={isEdit ? <Pencil size={16} /> : <Plus size={16} />}
    >
      <Form 
        form={form} 
        layout="vertical" 
        requiredMark
      >
        <Form.Item 
          name="purpose" 
          label="Purpose" 
          required
        >
          <Input 
            placeholder="e.g. Price discussion" 
          />
        </Form.Item>
        <Form.Item 
          name="remarks"
          label="Remarks" 
          required
        >
          <Input.TextArea 
            rows={3} 
            placeholder="Call summary / notes" 
          />
        </Form.Item>
        <Form.Item 
          name="nextFollowUpDate" 
          label="Next Follow-up Date">
          <DatePicker
            className="w-full!"
            disabledDate={(d) => d.isBefore(dayjs(), "day")}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            onClick={handleOk} 
            loading={isPending}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FollowUpModal;