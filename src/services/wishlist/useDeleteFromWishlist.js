import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteFromWishlist as deleteFromWishlistApi } from "./wishlistApi";

export function useDeleteFromWishlist() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteFromWishlist,
    isPending: isDeletingFromWishlist,
    error,
  } = useMutation({
    mutationKey: ["wishlist"],
    mutationFn: deleteFromWishlistApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Item removed from wishlist");
    },
    onError: () => toast.error("Item not removed from wishlist"),
  });
  return { deleteFromWishlist, isDeletingFromWishlist, error };
}
