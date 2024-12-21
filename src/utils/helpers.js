export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
  }).format(value || 0);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatShortDate(date) {
  return new Date(date)
    .toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "long",
    })
    .split(" ")
    .join(", ");
}

export function formatLongDate(date) {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
