import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { forgotPassword as forgotPasswordAPI } from "../auth/authApi";

export function useForgotPassword() {
  const queryClient = useQueryClient();

  const {
    mutate: forgotPassword,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: forgotPasswordAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Email sent. Check inbox for reset link");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { forgotPassword, isLoading, error };
}
