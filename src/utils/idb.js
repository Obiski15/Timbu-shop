import { openDB } from "idb";

export const initIDB = async (idbKey) => {
  return openDB(idbKey, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(idbKey)) {
        db.createObjectStore(idbKey, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export async function trimStore(store, maxEntries) {
  const length = (await store.getAll()).length;
  let cursor = await store.openCursor();
  let count = 0;

  while (cursor) {
    count++;

    if (count - 1 < length - maxEntries) {
      cursor.delete();
    }
    cursor = await cursor.continue();
  }
}
