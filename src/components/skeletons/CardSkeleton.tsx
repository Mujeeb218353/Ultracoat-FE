import React from "react";

interface CardSkeletonProps {
  count?: number;
  parentClassName?: string;
  containerClassName?: string;
  cardClassName?: string;
  cardChildren?: React.ReactNode;
}

const CardSkeleton = ({
  count = 1,
  containerClassName = "",
  cardClassName = "",
  cardChildren
}: CardSkeletonProps) => {
  return (
    <div className={`w-full flex flex-col md:flex-row gap-4 ${containerClassName}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-full h-40 animate-pulse rounded-xl border border-gray-100 bg-gray-200 p-5 space-y-4 ${cardClassName}`}
        >
          {cardChildren}
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;