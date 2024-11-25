import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview as addReviewApi } from "../reviewsApi";

export function useAddReview() {
  const queryClient = useQueryClient();

  const {
    mutate: addReview,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["reviews"],
    mutationFn: ({ rating, comment }) => addReviewApi(rating, comment),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });

  return { addReview, isLoading, error };
}
