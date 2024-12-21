import { useQuery } from "@tanstack/react-query";

import { getRecentlyViewedItems } from "./recentlyviewed";

export function useRecentlyViewedItems() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recentlyViewed"],
    queryFn: getRecentlyViewedItems,

    staleTime: 0,
  });
  return { data, isLoading, error };
}
