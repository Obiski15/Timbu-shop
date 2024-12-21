import { useContext } from "react";

import { DeliveryContext } from "./DeliveryProvider";

export function useDeliveryContext() {
  const context = useContext(DeliveryContext);

  if (!context)
    throw new Error(
      "delivery context is being accessed outside of it's provider"
    );

  return context;
}
