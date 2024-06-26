import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
const jateDB = await openDB("jate", 1);
//  transaction specifying db for privileges
const tx = jateDB.transaction("jate", "readwrite");
// Open desired object store
const store = tx.objectStore("jate");
// Pass in content
const request = store.put({ id: 1, value: content });
// confirming when request is made as a result for the console.log
const result = await request;
console.log("data saved to the database", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');
  // Database 
  const jateDB = await openDB("jate", 1);
  // New transaction specifying db and privileges
  const tx = jateDB.transaction("jate", "readonly");
  // desired object 
  const store = tx.objectStore("jate");
  // Get all request
  const request = store.getAll();
  // Confirmation and return
  const result = await request;
  console.log("data read from database", result);
  return result.value;
};

initdb();
