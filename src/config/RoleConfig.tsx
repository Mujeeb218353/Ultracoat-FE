import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  CircleCheckBig,
  MessageSquare,
  CalendarDays,
  Package,
  Settings,
  Layers,
} from "lucide-react";

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  path?: string;
  children?: MenuItem[];
  badge?: number;
};

export interface MenuGroup {
  groupLabel?: string;
  items: MenuItem[];
};

export interface RoleConfig {
  label: string;
  basePath: string;
  groups: MenuGroup[];
};

const iconSize = 18;

const adminGroups = [
  {
    items: [
      {
        key: "dashboard",
        icon: <LayoutDashboard size={iconSize} />,
        label: "Dashboard",
        path: "dashboard",
      },
      {
        key: "representatives",
        icon: <Users size={iconSize} />,
        label: "Representatives",
        path: "representatives",
      },
      {
        key: "customers",
        icon: <Building size={iconSize} />,
        label: "Customers",
        path: "customers",
      },
      {
        key: "quotations",
        icon: <FileText size={iconSize} />,
        label: "Quotations",
        path: "quotations",
      },
      {
        key: "finished-jobs",
        icon: <CircleCheckBig size={iconSize} />,
        label: "Finished Jobs",
        path: "finished-jobs",
      },
      {
        key: "feedbacks",
        icon: <MessageSquare size={iconSize} />,
        label: "Feedbacks",
        path: "feedbacks",
      },
      {
        key: "follow-ups",
        icon: <CalendarDays size={iconSize} />,
        label: "Follow-ups",
        path: "follow-ups",
      },
      {
        key: "product-management",
        icon: <Package size={iconSize} />,
        label: "Product Management",
        children: [
          {
            key: "feature-management",
            icon: <Settings size={iconSize} />,
            label: "Feature Management",
            path: "product-management/feature-management",
          },
          {
            key: "die-size-management",
            icon: <Layers size={iconSize} />,
            label: "Die Size Management",
            path: "product-management/die-size-management",
          },
        ],
      },
    ],
  },
];

const ROLE_CONFIG: Record<string, RoleConfig> = {
  admin: {
    label: "Admin",
    basePath: "/",
    groups: adminGroups,
  }
};

export default ROLE_CONFIG;