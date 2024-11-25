import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./categoriesApi";

export function useCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { data, isLoading, error };
}
