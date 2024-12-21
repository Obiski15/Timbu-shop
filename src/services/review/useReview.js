import { useQuery } from "@tanstack/react-query";
import { getReviews } from "./reviewsApi";
export function useReview(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id),
  });

  return { data, isLoading, error };
}
