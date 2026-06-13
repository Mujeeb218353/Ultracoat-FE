import ROLE_CONFIG from "@/config/RoleConfig";
import { MenuItem } from "@/config/RoleConfig";

export const cleanPath = (base: string, path: string) => {
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanSub = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}/${cleanSub}`;
};

export const buildPathKeyMap = (): Record<string, string> => {
  const map: Record<string, string> = {};

  Object.values(ROLE_CONFIG).forEach(({ basePath, groups }) => {
    groups.forEach(({ items }: (typeof groups)[number]) => {
      const flatten = (item: MenuItem) => {
        if (item.path) {
          map[cleanPath(basePath, item.path)] = item.key;
        }
        item.children?.forEach(flatten);
      };
      items.forEach(flatten);
    });
  });

  return map;
};

export const PATH_KEY_MAP = buildPathKeyMap();

const getSelectedMenuKeys = (pathname: string): string[] => {
  if (PATH_KEY_MAP[pathname]) return [PATH_KEY_MAP[pathname]];

  const match = Object.keys(PATH_KEY_MAP)
    .filter((path) => pathname.startsWith(path))
    .sort((a, b) => b.length - a.length)[0];

  return match ? [PATH_KEY_MAP[match]] : [];
};

export default getSelectedMenuKeys;