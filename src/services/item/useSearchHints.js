import { useQuery } from "@tanstack/react-query";

import { useDebouncedTerm } from "../../hooks/useDebounceTerm";
import { getHints } from "./itemsApi";

export function useSearchHints(query) {
  const debouncedQuery = useDebouncedTerm(query);

  const {
    data: hints,
    isLoading: isLoadingHints,
    error,
    isFetched: isFetchedHints,
  } = useQuery({
    queryKey: ["hints", debouncedQuery],
    queryFn: () => getHints(debouncedQuery),

    enabled: !!debouncedQuery,
  });

  return { hints, isLoadingHints, error, isFetchedHints };
}
