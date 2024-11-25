import { useQuery } from "@tanstack/react-query";
import { getCategory } from "./categoriesApi";

export function useCategory(categoryId) {
  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(categoryId),
  });

  return { category, isLoading, error };
}
