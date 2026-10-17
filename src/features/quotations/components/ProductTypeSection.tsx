import { Box, FileText, Table2, Tag } from "lucide-react";
import { Skeleton } from "antd";
import SectionCard from "./SectionCard";
import useProductsList from "@/features/products/hooks/use-products-list";

const icons: Record<string, typeof Tag> = {
  Label: Tag,
  Sheet: Table2,
  Document: FileText,
};

interface Props {
  value?: string;
  onChange?: (productId: string) => void;
}

const ProductTypeSection = ({ value, onChange }: Props) => {
  const { data, isPending } = useProductsList();
  const products = Array.isArray(data) ? data : [];

  return (
    <SectionCard icon={Box} title="Product Type">
      {isPending ? (
        <Skeleton.Button active block />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {products.map((p) => {
            const Icon = icons[p.name ?? ""] ?? Tag;
            const active = value === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange?.(p.id!)}
                className={`flex flex-col items-center gap-1 rounded-lg border border-slate-300 dark:border-white/10 px-4 py-3 text-xs font-bold transition ${
                  active
                    ? "bg-[#001259] border-[#001259] hover:bg-blue-950 hover:border-blue-950 text-white"
                    : "bg-white dark:bg-transparent"
                }`}
              >
                <Icon size={14} />
                {p.name}
              </button>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
};

export default ProductTypeSection;