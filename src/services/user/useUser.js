import { useQuery } from "@tanstack/react-query";
import { getUser } from "./userApi";

export function useUser() {
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return { user, isLoadingUser, userError };
}
