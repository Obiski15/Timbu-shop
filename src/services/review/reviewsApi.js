const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/reviews`;

export async function getReviews(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function addReview({ rating, comment }) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: { rating, comment },
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
