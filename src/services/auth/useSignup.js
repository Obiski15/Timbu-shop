import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupAPI } from "../auth/authApi";

export function useSignup() {
  const queryClient = useQueryClient();

  const {
    mutate: signup,
    isPending: isSigningUp,
    error,
  } = useMutation({
    mutationFn: ({
      tel,
      email,
      lastName,
      password,
      firstName,
      userAddress,
      confirmPassword,
    }) =>
      signupAPI({
        tel,
        email,
        lastName,
        password,
        firstName,
        userAddress,
        confirmPassword,
      }),
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toast.success("Account created Successfully. Redirecting...");
    },

    onError: (error) => toast.success(error.message),
  });
  return { signup, isSigningUp, error };
}
