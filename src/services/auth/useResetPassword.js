import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resetPassword as resetPasswordAPI } from "../auth/authApi";

export function useResetPassword() {
  const queryClient = useQueryClient();

  const {
    mutate: resetPassword,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: resetPasswordAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Password reset successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { resetPassword, isLoading, error };
}
