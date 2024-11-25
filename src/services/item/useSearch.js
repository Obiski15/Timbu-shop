import { useInfiniteQuery } from "@tanstack/react-query";

import { searchItems } from "./itemsApi";

export function useSearch(options) {
  const { query, limit = 10, categoryId, sortBy, price } = options;

  const {
    data,
    error,
    isLoading,
    isFetched,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["items", query, categoryId, sortBy, price],

    queryFn: ({ pageParam }) =>
      searchItems({ query, page: pageParam, limit, categoryId, sortBy, price }),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.items.length < limit) return undefined;

      return allPages.length + 1;
    },

    refetchOnMount: false,
    enabled: !!query,
    gcTime: 0,
  });

  return {
    data,
    error,
    isLoading,
    isFetched,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  };
}
