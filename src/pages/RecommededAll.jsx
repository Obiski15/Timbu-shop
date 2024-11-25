import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import { useSearch } from "../services/item/useSearch";

import AllItemsContainer from "../features/items/AllItemsContainer";
import PageLayout from "../ui/layouts/PageLayout";

function RecommededAll() {
  const [searchParams] = useSearchParams();

  const {
    data,
    error,
    isFetched,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useSearch({
    query: "modern",
    categoryId: searchParams.get("categoryId"),
    sortBy: searchParams.get("sortBy"),
  });

  const items = useMemo(() => {
    return data?.pages?.map((page) => page?.data?.items)?.flat();
  }, [data]);

  return (
    <PageLayout>
      <AllItemsContainer
        isFetchNextPageError={isFetchNextPageError}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isFetched={isFetched}
        error={error}
        data={items}
      />
    </PageLayout>
  );
}

export default RecommededAll;
