"use client";

import FormField from "@/components/FormField";
import { useCloseModal } from "@/features/modal/selectors/modal.selector";
import { Button, Form } from "antd";
import useUpdateSize from "../hooks/use-update-size";
import { updateSizeSchema } from "../schemas/sizes.schema";
import { Size } from "../types/sizes.types";

interface UpdateSizeFormProps {
  size: Size;
}

const UpdateSizeForm = ({ size }: UpdateSizeFormProps) => {
  const [form] = Form.useForm();
  const closeModal = useCloseModal();
  const { mutate: updateSize, isPending } = useUpdateSize();

  const handleFinish = (values: Size) => {
    updateSize(values, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={size}
      className="flex! flex-col! gap-2!"
      key={size?.id}
      preserve={false}
    >
      <FormField name="id" hidden={true} />

      <FormField
        name="name"
        label="Size"
        type="text"
        schema={updateSizeSchema.shape.name}
        placeholder="10x20"
        size="small"
        required
      />

      <div className="w-full flex flex-col-reverse sm:flex-row items-center gap-4 justify-center sm:justify-end">
        <Button disabled={isPending} onClick={closeModal} className="dark:disabled:border-gray-600! dark:disabled:text-gray-400!">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Update Size
        </Button>
      </div>
    </Form>
  );
};

export default UpdateSizeForm;