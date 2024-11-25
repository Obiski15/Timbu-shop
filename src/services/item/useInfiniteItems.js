import { useInfiniteQuery } from "@tanstack/react-query";
import { getItems } from "./itemsApi";

export function useInfiniteItems({ limit = 20, categoryId, sortBy }) {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["infiniteItems"],
    queryFn: ({ pageParam }) =>
      getItems({ page: pageParam, limit, categoryId, sortBy }),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.items.length < 20) return undefined;

      return allPages.length + 1;
    },
    staleTime: 0,
    gcTime: 0,
  });
  return {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  };
}
