"use client";

import { Form, Typography } from "antd";
import type { Rule } from "antd/es/form";
import type { ZodType } from "zod";
import FormInput, { FormInputProps } from "./Input";

interface FormFieldProps extends FormInputProps {
  name: string;
  label?: string;
  schema?: ZodType<unknown>;
  required?: boolean;
  dependencies?: string[];
  customValidator?: (value: string, allValues: Record<string, unknown>) => string | null;
}

const FormField = ({
  name,
  label,
  schema,
  required = false,
  dependencies,
  customValidator,
  type,
  ...inputProps
}: FormFieldProps) => {
  const form = Form.useFormInstance();

  const rules: Rule[] = [
    {
      validator: async (_rule, value: string) => {
        if (required && (value === undefined || value === null || value === "")) {
          return Promise.reject(label ? `${label} is required` : "This field is required");
        }

        if (customValidator) {
          const allValues = form.getFieldsValue();
          const error = customValidator(value, allValues);
          if (error) return Promise.reject(error);
          return Promise.resolve();
        }

        if (schema) {
          const result = schema.safeParse(value);
          if (!result.success) return Promise.reject(result.error.issues[0].message);
        }

        return Promise.resolve();
      },
    },
  ];

  return (
    <Form.Item
      name={name}
      label={
        label ? (
          <Typography.Text
            className={`text-sm! text-white/80! font-medium! ${type === "otp" ? "w-full! text-center!" : ""}`}
          >
            {label}
          </Typography.Text>
        ) : undefined
      }
      className={`m-0! flex flex-col gap-2 ${type === "otp" ? "items-center! w-full! [&_.ant-form-item-label]:w-full! [&_.ant-form-item-label]:text-center!" : ""}`}
      dependencies={dependencies}
      rules={rules}
    >
      <FormInput type={type} {...inputProps} />
    </Form.Item>
  );
};

export default FormField;