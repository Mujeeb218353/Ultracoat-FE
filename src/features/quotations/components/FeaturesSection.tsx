import { Info, Layers, Tag } from "lucide-react";
import { Checkbox, Form, Skeleton } from "antd";
import SectionCard from "./SectionCard";
import useFeaturesList from "@/features/features/hooks/use-features-list";
import { getVisibleGroups, pruneOptions } from "@/features/quotations/utils/feature.options";
import { Feature } from "@/features/features/types/features.types";
import { SelectedFeature } from "../types/quotations.types";

interface PickerProps {
  features: Feature[];
  loading: boolean;
  value?: SelectedFeature[];
  onChange?: (next: SelectedFeature[]) => void;
}

const FeaturesPicker = ({ features, loading, value = [], onChange }: PickerProps) => {
  const toggle = (id: string) => onChange?.(value.some((s) => s.featureId === id) ? value.filter((s) => s.featureId !== id) : [...value, { featureId: id, options: {} }]);

  const setOption = (feature: Feature, groupId: string, valueIds: string[]) => onChange?.( value.map((s) => s.featureId === feature.id ? { 
    ...s, 
    options: pruneOptions(feature, { 
      ...s.options, 
      [groupId]: valueIds 
      }) 
    } : s
  ));

  if (loading) return <Skeleton active />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((f) => {
        const sel = value.find((s) => s.featureId === f.id);
        const groups = sel ? getVisibleGroups(f, sel.options) : [];

        return (
          <div
            key={f.id}
            className={`overflow-hidden rounded-lg border transition ${
              sel
                ? "border-slate-300 dark:border-slate-700"
                : "border-slate-300 dark:border-slate-700"
            }`}
          >
            <label
              className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-[10px] font-bold uppercase ${
                sel ? "bg-gray-50 dark:bg-slate-800/60" : ""
              }`}
            >
              <Checkbox checked={!!sel} onChange={() => toggle(f.id!)} />
              {f.name}
            </label>

            {sel && groups.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-transparent">
                {groups.map((g) => {
                  const picked = sel.options[g.id!] ?? [];
                  const multiple = g.selectionType === "MULTIPLE";
                  const values = [...(g.values ?? [])].sort(
                    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
                  );

                  const handleSelect = (id: string) => {
                    const isPicked = picked.includes(id);
                    const next = multiple
                      ? isPicked
                        ? picked.filter((p) => p !== id)
                        : [...picked, id]
                      : isPicked
                      ? []
                      : [id];
                    setOption(f, g.id!, next);
                  };

                  return (
                    <div key={g.id} className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                        <Layers size={10} /> {g.label}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {values.map((v) => {
                          const active = picked.includes(v.id!);
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => handleSelect(v.id!)}
                              className={`rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase transition ${
                                active
                                  ? "border-green-700 bg-green-700 text-white"
                                  : "border-slate-300 bg-white text-gray-600 hover:border-slate-500 dark:border-slate-600 dark:bg-transparent dark:text-gray-300"
                              }`}
                            >
                              {v.label ?? v.value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface Props {
  productId?: string;
}

const FeaturesSection = ({ productId }: Props) => {
  const { data, isFetching } = useFeaturesList({ enabled: !!productId });
  const rawData = data as { features: Feature[] } | undefined;
  const features = (Array.isArray(rawData?.features) ? rawData.features : []).filter(
    (f) => f.isActive !== false && f.productDetail?.id === productId
  );

  const validator = (_: unknown, selected: SelectedFeature[] = []) => {
    for (const sel of selected) {
      const feature = features.find((f) => f.id === sel.featureId);
      if (!feature) continue;
      for (const g of getVisibleGroups(feature, sel.options)) {
        if (!sel.options[g.id!]?.length) {
          return Promise.reject(new Error(`${feature.name}: select ${g.label}`));
        }
      }
    }
    return Promise.resolve();
  };

  return (
    <SectionCard icon={Tag} title="Features">
      <p className="mb-3 flex items-center gap-1 text-[11px] text-gray-400">
        <Info size={12} /> Select a feature to expand its options
      </p>
      <Form.Item name="features" rules={[{ validator }]} className="mb-0">
        <FeaturesPicker features={features} loading={isFetching} />
      </Form.Item>
    </SectionCard>
  );
};

export default FeaturesSection;