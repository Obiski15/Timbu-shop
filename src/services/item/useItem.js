import { useQuery } from "@tanstack/react-query";
import { getItem } from "./itemsApi";

export function useItem(id) {
  const { data, isLoading, isFetched, isSuccess, error } = useQuery({
    queryKey: ["items", id],
    queryFn: () => getItem(id),
  });

  return { data, isLoading, error, isFetched, isSuccess };
}
