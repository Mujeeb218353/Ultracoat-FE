"use client";

import { Button, Dropdown, Empty, Input, Menu, Spin, theme } from "antd";
import { Search } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";
import useDebounce from "@/hooks/use-debounce";
import { UseOptionsHook } from "@/hooks/use-paginated-options";
import { SelectOption } from "./PaginatedSelect";

interface PaginatedDropdownProps<T> {
  useOptions: UseOptionsHook<T>;
  getOption: (item: T) => SelectOption;
  value: string | null | undefined;
  onChange: (key: string) => void;
  placeholder: string;
  icon?: ReactNode;
  searchPlaceholder?: string;
}

const SCROLL_THRESHOLD = 24;

const PaginatedDropdown = <T,>({ useOptions, getOption, value, onChange, placeholder, icon, searchPlaceholder = "Search..." }: PaginatedDropdownProps<T>) => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [activated, setActivated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const search = useDebounce(searchText);

  const { items, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useOptions({ search, enabled: activated });

  const options = useMemo(() => items.map(getOption), [items, getOption]);

  const menuItems = useMemo(() => [...(search ? [] : [{ key: "", label: "All" }]), ...options.map((o) => ({ key: o.value, label: o.label }))], [options, search]);

  const buttonLabel = value ? selectedLabel ?? options.find((o) => o.value === value)?.label ?? placeholder : placeholder;

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) setActivated(true);
    else setSearchText("");
  };

  const handleSelect = (key: string) => {
    setSelectedLabel(key ? options.find((o) => o.value === key)?.label ?? null : null);
    onChange(key);
    handleOpenChange(false);
  };

  return (
    <Dropdown
      trigger={["click"]}
      open={open}
      onOpenChange={handleOpenChange}
      popupRender={() => (
        <div
          style={{
            background: token.colorBgElevated,
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadowSecondary,
            minWidth: 220,
          }}
        >
          <div className="p-2">
            <Input
              allowClear
              autoFocus
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<Search size={14} className="text-gray-400" />}
              placeholder={searchPlaceholder}
            />
          </div>

          <div
            style={{ maxHeight: 256, overflowY: "auto" }}
            onScroll={(e) => {
              const target = e.currentTarget;
              const nearBottom = target.scrollTop + target.offsetHeight >= target.scrollHeight - SCROLL_THRESHOLD;
              if (nearBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
          >
            <Menu
              selectable
              selectedKeys={[value ?? ""]}
              items={menuItems}
              onClick={({ key }) => handleSelect(key)}
              style={{ border: "none", background: "transparent" }}
            />

            {isFetching && (
              <div className="flex justify-center py-2">
                <Spin size="small" />
              </div>
            )}

            {!isFetching && options.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="my-2!" />}
          </div>
        </div>
      )}
    >
      <Button icon={icon}>{buttonLabel}</Button>
    </Dropdown>
  );
};

export default PaginatedDropdown;
