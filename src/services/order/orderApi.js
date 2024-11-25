const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/order`;

export async function getOrders() {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
