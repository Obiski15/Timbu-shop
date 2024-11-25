import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { logout as logoutAPI } from "../auth/authApi";

export function useLogout() {
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: logoutAPI,
    mutationKey: ["user"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("User Logged Out");
      queryClient.clear();
    },

    onError: (error) => toast.error(error.message),
  });
  return { logout, isLoggingOut, error };
}
