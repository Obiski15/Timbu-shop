import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { useSearch } from "../services/item/useSearch";

import HorizontalItemsContainer from "../features/items/HorizontalItemsContainer";
import AllItemsContainer from "../features/items/AllItemsContainer";
import useSearchQuery from "../providers/search/useSearchQuery";
import ItemsContainer from "../features/items/ItemsContainer";
import PageLayout from "../ui/layouts/PageLayout";

function Search() {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [searchParams] = useSearchParams();

  console.log(searchQuery);

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
    query: searchQuery,
    categoryId: searchParams.get("categoryId"),
    sortBy: searchParams.get("sortBy"),
    price: searchParams.get("price"),
  });

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, []);

  const items = data?.pages?.map((page) => page?.data?.items)?.flat();

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
      <ItemsContainer heading="you may also like" />
      <HorizontalItemsContainer heading="flash sale" limit={15} />
    </PageLayout>
  );
}

export default Search;
