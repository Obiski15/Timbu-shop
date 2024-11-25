const BASE_URL = `${import.meta.env.VITE_API_ROUTE}/user`;

export async function signup({
  tel,
  email,
  lastName,
  password,
  firstName,
  userAddress,
  confirmPassword,
}) {
  const res = await fetch(`${BASE_URL}/signup`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      tel,
      email,
      lastName,
      password,
      firstName,
      userAddress,
      confirmPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function logout() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function resetPassword({ password, confirmPassword, resetToken }) {
  const res = await fetch(`${BASE_URL}/resetPassword/${resetToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, confirmPassword }),
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
