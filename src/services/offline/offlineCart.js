import { initIDB } from "../../utils/idb";

const DB_KEY = "cart";

export async function getCart() {
  const db = await initIDB(DB_KEY);

  const tx = db.transaction(DB_KEY, "readonly");

  const store = tx.objectStore(DB_KEY);

  const cart = await store.getAll();

  await tx.done;

  return cart;
}

export async function addToCart() {
  const db = await initIDB(DB_KEY);

  const tx = db.transaction(DB_KEY, "readonly");

  const store = tx.objectStore(DB_KEY);

  const cart = await store.getAll();

  await tx.done;

  return cart;
}

export async function removeItemFromCart() {
  const db = await initIDB(DB_KEY);

  const tx = db.transaction(DB_KEY, "readonly");

  const store = tx.objectStore(DB_KEY);

  const cart = await store.getAll();

  await tx.done;

  return cart;
}

export async function removeFromCart() {
  const db = await initIDB(DB_KEY);

  const tx = db.transaction(DB_KEY, "readonly");

  const store = tx.objectStore(DB_KEY);

  const cart = await store.getAll();

  await tx.done;

  return cart;
}

export async function clearCart() {
  const db = await initIDB(DB_KEY);

  const tx = db.transaction(DB_KEY, "readonly");

  const store = tx.objectStore(DB_KEY);

  const cart = await store.getAll();

  await tx.done;

  return cart;
}
