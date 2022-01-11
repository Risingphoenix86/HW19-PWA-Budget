export function checkForIndexedDb() {
    if (!window.indexedDB) {
        console.log("IndexedDB not found");
        return false;
    }
    return true;
}

