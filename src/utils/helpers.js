import { CURRENCY } from "./constants";

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: CURRENCY,
  }).format(value);
}
