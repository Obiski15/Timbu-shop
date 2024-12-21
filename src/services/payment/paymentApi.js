const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/payment`;

export async function retrievePaymentIntent(paymentId) {
  const res = await fetch(`${BASE_URL}/retrieve_intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentId }),
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function createPaymentIntent(data) {
  const res = await fetch(`${BASE_URL}/create_intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
