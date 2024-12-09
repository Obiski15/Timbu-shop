import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { removeItemFromCart as removeItemFromCartAPI } from "./cartApi";

export function useRemoveItemFromCart() {
  const queryClient = useQueryClient();

  const {
    mutate: removeItemFromCart,
    isPending: isRemovingItemFromCart,
    error,
  } = useMutation({
    mutationKey: ["cart"],
    mutationFn: removeItemFromCartAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Item removed from cart");
    },
    onError: (error) => toast.error(error.message),
  });
  return { removeItemFromCart, isRemovingItemFromCart, error };
}
