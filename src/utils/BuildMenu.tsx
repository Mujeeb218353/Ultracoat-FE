import { LogOut } from "lucide-react";
import { RoleConfig, MenuItem } from "@/config/RoleConfig";
import type { MenuProps } from "antd";
import Link from "next/link";
import { cleanPath } from "@/config/getSelectedMenuKeys";

type ItemType = NonNullable<MenuProps["items"]>[number];

const buildLeaf = (item: MenuItem, basePath: string): ItemType => ({
  key: item.key,
  icon: <span>{item.icon}</span>,
  label: item.path ? (
    <Link href={cleanPath(basePath, item.path)} className="text-xs font-semibold">{item.label}</Link>
  ) : (
    <span className="text-xs ">{item.label}</span>
  ),
});

const BuildMenuItems = (
  roleConfig: RoleConfig | null,
  collapsed: boolean,
): ItemType[] => {

  if (!roleConfig) return [];

  const { basePath, groups } = roleConfig;
  const items: ItemType[] = [];
  let hasSupportGroup = false;
  
  const logoutItem: ItemType = {
    key: "logout",
    icon: <LogOut size={15} />,
    label: <span className={`font-semibold! text-xs!`}>Logout</span>,
    danger: !collapsed,
  };

  groups.forEach((group: typeof roleConfig.groups[0]) => {

    if (group.groupLabel) {
      const isSupportGroup = group.groupLabel.toUpperCase() === "SUPPORT";
      if (isSupportGroup) hasSupportGroup = true;

      items.push({
        type: "group",
        label: <span className={`text-xs font-semibold ${collapsed ? 'hidden' : 'block'}`}>{group.groupLabel}</span>,
        children: [
          ...group.items.map((item: MenuItem) => item.children ? {
            key: item.key,
            icon: item.icon,
            label: item.label,
            children: item.children.map((child: MenuItem) => buildLeaf(child, basePath)),
          }
          : 
          buildLeaf(item, basePath)
          ),
          ...(isSupportGroup ? [logoutItem] : []),
        ],
      });
    } else {
      
      group.items.forEach((item: MenuItem) => {
        if (item.children) {
          items.push({
            key: item.key,
            icon: <span className="">{item.icon}</span>,
            label: <span className="text-xs font-semibold">{item.label}</span>,
            children: item.children.map((child: MenuItem) =>
              buildLeaf(child, basePath)
            ),
          });
        } else {
          items.push(buildLeaf(item, basePath));
        }
      });
    }
  });

  if (!hasSupportGroup) {
    items.push({
      type: "group",
      label: <span className={`text-xs font-semibold ${collapsed ? 'hidden' : 'block'}`}>SUPPORT</span>,
      children: [logoutItem],
    });
  }

  return items;
};

export default BuildMenuItems;