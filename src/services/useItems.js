import { useQuery } from "@tanstack/react-query";
import { getItems } from "./itemsApi";

export function useItems() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  return { data, isLoading, error };
}
