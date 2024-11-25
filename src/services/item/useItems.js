import { useQuery } from "@tanstack/react-query";
import { getItems } from "./itemsApi";

export function useItems(options) {
  const { categoryId = "", limit = 20 } = { ...options };

  const { data, error, isLoading } = useQuery({
    queryKey: ["items", categoryId, limit],
    queryFn: () => getItems({ limit, categoryId, page: 1 }),
  });
  return {
    data,
    error,
    isLoading,
  };
}
