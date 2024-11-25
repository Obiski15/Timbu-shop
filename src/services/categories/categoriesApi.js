const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/categories`;

export async function getCategories() {
  const res = await fetch(BASE_URL);

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function getCategory(categoryId) {
  const res = await fetch(`${BASE_URL}/${categoryId}`);

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
