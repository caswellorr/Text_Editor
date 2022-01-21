

import { openDB } from 'idb';

// =========== INITIALIZE INDEXED DATABASE ============

const initdb = async () =>
  openDB('jateDb', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateDb')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // ========== ADD CONTENT TO DB ==============

export const putDb = async (content) => {

  try {

    console.log('Added to jate database');

    const jateDb = await openDB('jateDb', 1);

    const tx = jateDb.transaction('jateDb', 'readwrite');

    const store = tx.objectStore('jate');

    const request = store.add({content});

    const result = await request;

    console.log('🚀 - data saved to the database', result);

  } catch (error) {
    
    console.error('putDb not implemented');

  };
};

// ========== RETRIEVE ALL CONTENT FROM DB ============

export const getDb = async () => {

  try {

    console.log('Retrieve all data from the database');

    const jateDb = await openDB('jateDb', 1);

    const tx = jateDb.transaction('jateDb', 'readonly');

    const store = tx.objectStore('jate');

    const request = store.getAll();

    const result = await request;

    console.log('result.value', result);

    return result;

  } catch (error) {
    
    console.error('getDb not implemented');

  };
};

initdb();
