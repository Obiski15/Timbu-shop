const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/user`;

export async function getUser() {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function updateUserShippingAddress({
  shippingAddress: {
    city,
    region,
    address,
    country,
    postalCode,
    additionalInfo,
  },
}) {
  const res = await fetch(BASE_URL, {
    method: "PATCH",
    body: JSON.stringify({
      shippingAddress: {
        city,
        region,
        address,
        country,
        postalCode,
        additionalInfo,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function updateUserAddress({
  userAddress: { city, region, address, country },
}) {
  const res = await fetch(BASE_URL, {
    method: "PATCH",
    body: JSON.stringify({
      userAddress: { city, region, address, country },
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function deleteUser() {
  const res = await fetch(BASE_URL, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
