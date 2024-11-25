import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUserShippingAddress as updateUserShippingAddressAPI } from "./userApi";

export function useUpdateShippingAddress() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUserShippingAddress,
    isPending: isUpdatingAddress,
    error: addressUpdateError,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ shippingAddress }) =>
      updateUserShippingAddressAPI({ shippingAddress }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Shipping address updated");
    },

    onError: (error) => toast.error(error.message),
  });
  return { updateUserShippingAddress, isUpdatingAddress, addressUpdateError };
}
