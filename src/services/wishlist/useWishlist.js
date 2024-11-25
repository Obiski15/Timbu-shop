import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "./wishlistApi";

export function useWishlist() {
  const {
    data: wishlist,
    isLoading: isLoadingWishlist,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: (id) => getWishlist(id),
  });

  return { wishlist, isLoadingWishlist, error };
}
