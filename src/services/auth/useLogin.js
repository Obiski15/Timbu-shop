import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginAPI } from "../auth/authApi";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoggingIn,
    error,
  } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["user"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Logged in");
      queryClient.clear();
      navigate("/", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
  return { login, isLoggingIn, error };
}
