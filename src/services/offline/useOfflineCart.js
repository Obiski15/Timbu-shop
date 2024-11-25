import { useQuery } from "@tanstack/react-query";

export function useOfflineCart() {
  const {
    data: offlineCart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offlineCart"],
    // queryFn:
  });
  return { offlineCart, isLoading, error };
}
