import { initIDB, trimStore } from "../../utils/idb";

const IDB_KEY = "recentlySearched";

export async function getRecentlySearchedQuery() {
  const db = await initIDB(IDB_KEY);
  const tx = db.transaction(IDB_KEY, "readonly");

  const store = tx.objectStore(IDB_KEY);

  const search = (await store.getAll()).reverse();

  await tx.done;

  return search;
}

export async function updateRecentlySearchedQuery(query) {
  const db = await initIDB(IDB_KEY);

  const tx = db.transaction(IDB_KEY, "readwrite");

  const store = tx.objectStore(IDB_KEY);

  const isStored = (await store.getAll()).find(
    (search) => search.value === query.toLowerCase()
  );

  if (isStored) store.delete(isStored.id);

  await store.add({
    id: new Date().getTime() + Math.ceil(Math.random() * 50000 + 1),
    value: query.toLowerCase(),
  });

  trimStore(store, 10);

  await tx.done;
}
