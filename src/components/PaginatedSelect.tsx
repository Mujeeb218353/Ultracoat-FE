"use client";

import { Select, SelectProps } from "antd";
import { useMemo, useState } from "react";
import useDebounce from "@/hooks/use-debounce";
import { UseOptionsHook } from "@/hooks/use-paginated-options";

export interface SelectOption {
  value: string;
  label: string;
}

interface PaginatedSelectProps<T> extends Omit<SelectProps<string>, "options" | "onChange" | "showSearch" | "loading" | "onSearch" | "filterOption" | "onPopupScroll"> {
  useOptions: UseOptionsHook<T>;
  getOption: (item: T) => SelectOption;
  selectedOption?: SelectOption | null;
  onChange?: (value: string, item?: T) => void;
}

const SCROLL_THRESHOLD = 24;

const PaginatedSelect = <T,>({ useOptions, getOption, selectedOption, onChange, onOpenChange, ...rest }: PaginatedSelectProps<T>) => {
  const [activated, setActivated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const search = useDebounce(searchText);

  const { items, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useOptions({ search, enabled: activated });

  const options = useMemo(() => {
    const list = items.map(getOption);
    if (selectedOption && !search && !list.some((o) => o.value === selectedOption.value)) list.unshift(selectedOption);
    return list;
  }, [items, getOption, selectedOption, search]);

  return (
    <Select<string>
      listHeight={256}
      {...rest}
      options={options}
      loading={isFetching || isFetchingNextPage}
      showSearch={{ filterOption: false, onSearch: setSearchText }}
      onOpenChange={(open) => {
        if (open) setActivated(true);
        else setSearchText("");
        onOpenChange?.(open);
      }}
      onPopupScroll={(e) => {
        const target = e.currentTarget;
        const nearBottom = target.scrollTop + target.offsetHeight >= target.scrollHeight - SCROLL_THRESHOLD;
        if (nearBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onChange={(value) => onChange?.(value, items.find((item) => getOption(item).value === value))}
    />
  );
};

export default PaginatedSelect;
