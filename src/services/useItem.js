import { useQuery } from "@tanstack/react-query";
import { getItem } from "./itemsApi";

export function useItem(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItem(id),
  });

  return { data, isLoading, error };
}
