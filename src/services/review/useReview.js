import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getReviews } from "./reviewsApi";
export function useReview(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id),
  });

  return { data, isLoading, error };

  // const {
  //   data,
  //   isLoading,
  //   error,
  //   isFetchNextPageError,
  //   isFetchingNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["reviews", id],
  //   queryFn: ({ pageParam }) => getReviews({ page: pageParam, limit: 1, id }),

  //   getNextPageParam: (lastPage) => {
  //     return lastPage.data.reviews === 1;
  //   },
  // });

  // return {
  //   data,
  //   isLoading,
  //   error,
  //   isFetchNextPageError,
  //   isFetchingNextPage,
  //   hasNextPage,
  // };
}
