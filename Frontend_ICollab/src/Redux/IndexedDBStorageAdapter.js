import { set, get, del } from "idb-keyval";

const indexedDBStorageAdapter = {
  setItem: async (key, value) => {
    await set(key, value); // Stores data in IndexedDB
  },
  getItem: async (key) => {
    return await get(key); // Retrieves data from IndexedDB
  },
  removeItem: async (key) => {
    await del(key); // Deletes data from IndexedDB
  },
};

export default indexedDBStorageAdapter;
