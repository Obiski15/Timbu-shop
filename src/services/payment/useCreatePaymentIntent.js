import { useMutation } from "@tanstack/react-query";

import { createPaymentIntent } from "./paymentApi";

export function useCreatePaymentIntent() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: createPaymentIntent,
  });

  return { mutate, isPending, error };
}
