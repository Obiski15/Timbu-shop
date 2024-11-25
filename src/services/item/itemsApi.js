const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/items`;

export async function getItems({ categoryId, page, limit }) {
  const res = await fetch(
    `${BASE_URL}/?sort=-_id&category_id=${!categoryId ? "" : categoryId}${
      limit && page ? `&limit=${limit}&page=${page}` : ""
    }`
  );

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function getItem(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function getItemByName(search_url) {
  const res = await fetch(`${BASE_URL}/product/${search_url}`);

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function getHints(query) {
  const res = await fetch(`${BASE_URL}/hints/${query}`);

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function searchItems({
  query,
  limit,
  page,
  categoryId,
  sortBy,
  price,
}) {
  const res = await fetch(
    `${BASE_URL}/search/${query}/?sort=${sortBy ? sortBy : "-id"}&category_id=${
      !categoryId ? "" : categoryId
    }${limit && page ? `&limit=${limit}&page=${page}` : ""}&price=${
      price ? price : ""
    }`
  );

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
