import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUserAddress } from "./userApi";

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  const {
    mutate: updateAddress,
    isPending: isUpdatingAddress,
    error: addressUpdateError,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ userAddress }) => updateUserAddress({ userAddress }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User address updated");
    },

    onError: (error) => toast.error(error.message),
  });
  return { updateAddress, isUpdatingAddress, addressUpdateError };
}
