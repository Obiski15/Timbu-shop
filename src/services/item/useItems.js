import { useQuery } from "@tanstack/react-query";
import { getItems } from "./itemsApi";

export function useItems(options) {
  const { categoryId = "", limit = 20, sortBy = "-_id" } = { ...options };

  const { data, error, isLoading } = useQuery({
    queryKey: ["items", categoryId, limit],
    queryFn: () => getItems({ limit, categoryId, page: 1, sortBy }),
  });
  return {
    data,
    error,
    isLoading,
  };
}
