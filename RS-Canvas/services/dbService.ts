
import { IDBPDatabase, openDB } from 'idb';
import { Creation } from '../types';

const DB_NAME = 'NanoBananaDB';
const STORE_NAME = 'creations';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<unknown>> | null = null;

const initDB = () => {
  if (dbPromise) return dbPromise;
  dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
  return dbPromise;
};

export const saveCreation = async (creation: Creation): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.put(creation);
  await tx.done;
};

export const getCreations = async (): Promise<Creation[]> => {
  const db = await initDB();
  const creations = await db.getAll(STORE_NAME);
  return creations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const deleteCreation = async (id: string): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
};
