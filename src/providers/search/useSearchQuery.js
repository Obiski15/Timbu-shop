import { useContext } from "react";

import { SearchQueryContext } from "./SearchQueryProvider";

export function useSearchQuery() {
  const context = useContext(SearchQueryContext);

  if (!context)
    throw new Error("Search context is being accessed outside of its provider");

  return context;
}
