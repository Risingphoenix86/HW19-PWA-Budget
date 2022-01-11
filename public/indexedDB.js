export function checkForIndexedDb() {
    if (!window.indexedDB) {
        console.log("IndexedDB not found");
        return false;
    }
    return true;
}

export function useIndexedDB(databaseName, storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(databaseName,1);
        let db,
        trans,
        store;

        request.onupgradeneeded = function(event) {
            const db = request.result;
            db.createObjectStore(storeName, { keyPath: '_id' });
        };

        request.onerror = function(event) {
            console.log('error');
        };

        request.onsuccess = function(event) {
            db = request.result;
            trans = db.transaction(storeName, 'readwrite');
            store = trans.objectStore(StoreName);

            db.onerror = function(event) {
                console.log('error');
            };

            if (method === 'get') {
                const all = store.getAll();
                all.onsuccess = function() {
                    resolve(all.result);
                };
            } else if (method === 'put') {
                store.put(object);
            } else if (method === 'delete') { 
                store.delete(object.id);
            };

            trans.oncomplete = function() {
                db.close();
            };
        };
    });
}