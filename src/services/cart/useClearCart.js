import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart as clearCartAPI } from "./cartApi";

export function useClearCart() {
  const queryClient = useQueryClient();

  const {
    mutate: clearCart,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["cart"],
    mutationFn: clearCartAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
  return { clearCart, isLoading, error };
}
