import { useQuery } from "@tanstack/react-query";

import { getRecentlySearchedQuery } from "./recentlySearched";

export function useRecentlySearchedQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recentlySearched"],
    queryFn: getRecentlySearchedQuery,

    staleTime: 0,
  });
  return { data, isLoading, error };
}
