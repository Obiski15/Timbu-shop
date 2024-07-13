import { useQuery } from "@tanstack/react-query";
import { getItems } from "./itemsApi";

export function useCategory(category) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items", category],
    queryFn: () => getItems(category),
  });

  return { data, isLoading, error };
}
