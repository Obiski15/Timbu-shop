import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addToWishlist as addToWishlistApi } from "./wishlistApi";

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const {
    mutate: addToWishlist,
    isPending: isAddingToWishlist,
    error,
  } = useMutation({
    mutationKey: ["wishlist"],
    mutationFn: addToWishlistApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Item added to wishlist");
    },
    onError: () => toast.error("Item not added to wishlist"),
  });

  return { addToWishlist, isAddingToWishlist, error };
}
