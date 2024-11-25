import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addToCart as addToCartApi } from "./cartApi";

export function useAddToCart() {
  const queryClient = useQueryClient();

  const {
    mutate: addToCart,
    isPending: isAddingToCart,
    error,
  } = useMutation({
    mutationKey: ["cart"],
    mutationFn: addToCartApi,

    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      }, 1000);
      toast.success("Item added to cart");
    },
    onError: () => toast.error("Item not added to cart"),
  });
  return { addToCart, isAddingToCart, error };
}
