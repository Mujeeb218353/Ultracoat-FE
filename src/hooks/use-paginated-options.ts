import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface PageResult<T> {
  items: T[];
  total?: number;
}

export interface PaginatedOptionsParams<T> {
  queryKey: readonly unknown[];
  fetchPage: (query: { skip: number; limit: number; search: string }) => Promise<PageResult<T>>;
  getKey: (item: T) => string;
  search?: string;
  enabled?: boolean;
  pageSize?: number;
}

export interface PaginatedOptionsResult<T> {
  items: T[];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export type UseOptionsHook<T> = (params: { search: string; enabled: boolean }) => PaginatedOptionsResult<T>;

const usePaginatedOptions = <T,>({
  queryKey,
  fetchPage,
  getKey,
  search = "",
  enabled = true,
  pageSize = 20,
}: PaginatedOptionsParams<T>): PaginatedOptionsResult<T> => {
  const query = useInfiniteQuery({
    queryKey: [...queryKey, { search, pageSize }],
    queryFn: ({ pageParam }) => fetchPage({ skip: pageParam, limit: pageSize, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const seen = new Set(pages.slice(0, -1).flatMap((p) => p.items.map(getKey)));
      const hasNewItems = lastPage.items.some((item) => !seen.has(getKey(item)));
      if (!hasNewItems) return undefined;

      const loaded = pages.reduce((count, p) => count + p.items.length, 0);
      const hasMore = lastPage.total !== undefined ? loaded < lastPage.total : lastPage.items.length >= pageSize;
      return hasMore ? loaded : undefined;
    },
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const items = useMemo(() => {
    const seen = new Set<string>();
    return (query.data?.pages ?? []).flatMap((p) => p.items).filter((item) => {
      const key = getKey(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [query.data, getKey]);

  return {
    items,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: () => {
      query.fetchNextPage();
    },
  };
};

export default usePaginatedOptions;