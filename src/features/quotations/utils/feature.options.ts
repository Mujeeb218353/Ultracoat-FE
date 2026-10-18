import { Feature } from "@/features/features/types/features.types";

type Options = Record<string, string[]>;

export const getVisibleGroups = (feature: Feature, options: Options) => {
  const selected = new Set(Object.values(options).flat());
  return [...(feature.optionGroups ?? [])]
    .filter((g) => !g.dependsOnValueId || selected.has(g.dependsOnValueId))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
};

export const pruneOptions = (feature: Feature, options: Options): Options => {
  let current = options;
  for (;;) {
    const visible = new Set(getVisibleGroups(feature, current).map((g) => g.id));
    const next = Object.fromEntries(
      Object.entries(current).filter(([groupId]) => visible.has(groupId))
    );
    if (Object.keys(next).length === Object.keys(current).length) return next;
    current = next;
  }
};