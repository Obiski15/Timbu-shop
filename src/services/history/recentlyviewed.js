import { initIDB, trimStore } from "../../utils/idb";

const IDB_KEY = "recentlyViewed";

export async function getRecentlyViewedItems() {
  const db = await initIDB(IDB_KEY);
  const tx = db.transaction(IDB_KEY, "readonly");

  const store = tx.objectStore(IDB_KEY);

  const search = (await store.getAll()).reverse();

  await tx.done;

  return search;
}

export async function updateRecentlyViewedItems({
  name,
  id,
  price,
  image,
  discount,
}) {
  const db = await initIDB(IDB_KEY);

  const tx = db.transaction(IDB_KEY, "readwrite");

  const store = tx.objectStore(IDB_KEY);

  const isStored = (await store.getAll()).find((item) => item._id === id);

  if (isStored) store.delete(isStored.id);

  await store.add({
    id: new Date().getTime() + Math.ceil(Math.random() * 50000 + 1),
    _id: id,
    name,
    price,
    photo: image,
    discount,
  });

  trimStore(store, 10);

  await tx.done;
}
