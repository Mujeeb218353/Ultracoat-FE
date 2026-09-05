"use client";

import { Descriptions, Grid } from "antd";
import type { DescriptionsProps } from "antd";
import DescriptionsSkeleton from "./skeletons/DescriptionsSkeleton";

const { useBreakpoint } = Grid;

export interface DescriptionField<T> {
  label: string;
  render: (data: T) => React.ReactNode;
  span?: number;
}

interface DataDescriptionsProps<T> {
  data: T | null | undefined;
  fields: DescriptionField<T>[];
  loading?: boolean;
  column?: DescriptionsProps["column"];
  title?: string;
  bordered?: boolean;
  skeletonCount?: number;
  size?: DescriptionsProps["size"];
}

function DataDescriptions<T>({
  data,
  fields,
  loading = false,
  column = 2,
  title,
  bordered = true,
  skeletonCount,
  size = "small",
}: DataDescriptionsProps<T>) {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const itemCount = skeletonCount ?? fields.length;
  const resolvedColumn = isMobile ? 1 : column;

  if (loading || !data) {
    return (
      <Descriptions
        title={title}
        column={resolvedColumn}
        bordered={bordered}
        layout="vertical"
        size={size}
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <Descriptions.Item
            key={i}
            label={fields[i]?.label ?? ""}
            span={isMobile ? 1 : fields[i]?.span ?? 1}
          >
            <DescriptionsSkeleton />
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  }

  return (
    <Descriptions
      title={title}
      column={resolvedColumn}
      bordered={bordered}
      layout="vertical"
      size={size}
    >
      {fields.map((field) => (
        <Descriptions.Item
          key={field.label}
          label={field.label}
          span={isMobile ? 1 : field.span}
        >
          {field.render(data)}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
}

export default DataDescriptions;