import { useQuery } from "@tanstack/react-query";

import { retrievePaymentIntent } from "./paymentApi";

export function useRetrievePaymentIntent(paymentId) {
  const { isLoading, data, error } = useQuery({
    queryFn: () => retrievePaymentIntent(paymentId),
    enabled: !!paymentId,
  });
  return { data, isLoading, error };
}
