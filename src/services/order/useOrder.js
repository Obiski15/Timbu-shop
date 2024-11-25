import { useQuery } from "@tanstack/react-query";
import { getOrders } from "./orderApi";

export function useOrder() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: getOrders,
  });

  return { data, isLoading, error };
}
