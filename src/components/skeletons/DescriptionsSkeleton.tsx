"use client";

import { Skeleton } from "antd";
import { DescriptionsItemProps } from "antd/es/descriptions/Item";

interface CustomDescriptionItemProps extends DescriptionsItemProps {
  active?: boolean;
  size?: "small" | "default" | "large";
  skeletonWidth?: number;
  skeletonHeight?: number;
}

const DescriptionItem = ({ active = true, size = "small", skeletonWidth = 140, skeletonHeight = 18 }: CustomDescriptionItemProps) => {
  return (
    <Skeleton.Input
      active={active}
      size={size}
      style={{ 
        width: skeletonWidth, 
        height: skeletonHeight 
      }}
    />
  );
};

export default DescriptionItem;