const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/cart`;

export async function getCart() {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function addToCart(productId) {
  const res = await fetch(`${BASE_URL}/addToCart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function removeFromCart(productId) {
  const res = await fetch(`${BASE_URL}/removeFromCart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function removeItemFromCart(productId) {
  const res = await fetch(`${BASE_URL}/removeItemFromCart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function clearCart() {
  const res = await fetch(BASE_URL, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
