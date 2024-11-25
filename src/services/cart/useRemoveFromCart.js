import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { removeFromCart as removeFromCartAPI } from "./cartApi";

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromCart,
    isPending: isRemovingFromCArt,
    error,
  } = useMutation({
    mutationKey: ["cart"],
    mutationFn: removeFromCartAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Item removed from cart");
    },
    onError: () => toast.error("item not removed from cart"),
  });
  return { removeFromCart, isRemovingFromCArt, error };
}
