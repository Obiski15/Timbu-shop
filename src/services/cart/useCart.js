import { useQuery } from "@tanstack/react-query";
import { getCart } from "./cartApi";

export function useCart() {
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  return { cart, isLoading, error };
}
