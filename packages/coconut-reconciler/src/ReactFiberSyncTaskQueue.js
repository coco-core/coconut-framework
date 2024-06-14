
let syncQueue = null
let isFlushingSyncQueue = false

export function scheduleSyncCallback(callback) {
  if (syncQueue === null) {
    syncQueue = [callback]
  } else {
    syncQueue.push(callback)
  }
}

export function flushSyncCallbacks(){
  if (!isFlushingSyncQueue && syncQueue !== null) {
    isFlushingSyncQueue = true;
    let i = 0;
    try {
      const isSync = true;
      const queue = syncQueue;
      for (; i < queue.length; i++) {
        let callback = queue[i];
        do {
          callback = callback(isSync)
        } while (callback !== null)
      }
      syncQueue = null;
      isFlushingSyncQueue = false;
    } catch (e) {
      if (syncQueue !== null) {
        syncQueue = syncQueue.slice(i + 1);
        scheduleSyncCallback(flushSyncCallbacks)
        throw e;
      }
    } finally {
      isFlushingSyncQueue = false;
    }
  }
  return null;
}