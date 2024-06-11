import {enqueueConcurrentClassUpdate} from "./ReactFiberConcurrentUpdate";

export const UpdateState = 0;

export function createUpdate() {
  const update = {
    tag: UpdateState,
    payload: null
  }
  return update;
}

export function enqueueUpdate(
  fiber,
  update
) {
  const updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    return null;
  }

  const sharedQueue = updateQueue.shared;
  return enqueueConcurrentClassUpdate(fiber, sharedQueue, update)
}

export function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null
    }
  }
  fiber.updateQueue = queue;
}


export function cloneUpdateQueue(
  current,
  workInProgress
) {
  const queue = workInProgress.updateQueue;
  const currentQueue = current.updateQueue;
  if (queue === currentQueue) {
    const clone = {
      baseState: currentQueue.baseState,
      firstBaseUpdate: currentQueue.firstBaseUpdate,
      lastBaseUpdate: currentQueue.lastBaseUpdate,
      shared: currentQueue.shared,
    }
    workInProgress.updateQueue = clone;
  }
}

function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  switch (update.tag) {
    case UpdateState: {
      const payload = update.payload;
      let partialState;
      if (typeof payload === 'function') {
        partialState = payload.call(instance, prevState, nextProps);
      } else {
        partialState = payload;
      }
      if (partialState === null || partialState === undefined) {
        return prevState;
      }
      return Object.assign({}, prevState, partialState);
    }
  }
}


export function processUpdateQueue(
  workInProgress,
  props,
  instance
) {
  const queue = workInProgress.updateQueue;

  let firstBaseUpdate = queue.firstBaseUpdate;
  let lastBaseUpdate = queue.lastBaseUpdate;

  let pendingQueue = queue.shared.pending;
  if (pendingQueue !== null) {
    queue.shared.pending = null;
    const lastPendingUpdate = pendingQueue;
    const firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    if (lastBaseUpdate === null) {
      firstBaseUpdate = firstPendingUpdate;
    } else {
      lastBaseUpdate.next = firstPendingUpdate;
    }
    lastBaseUpdate = lastPendingUpdate

    const current = workInProgress.alternate;
    if (current !== null) {
      const currentQueue = current.updateQueue;
      const currentLastBaseUpdate = currentQueue.lastBaseUpdate;
      if (currentLastBaseUpdate !== lastBaseUpdate) {
        if (currentLastBaseUpdate === null) {
          currentQueue.firstBaseUpdate = firstPendingUpdate;
        } else {
          currentLastBaseUpdate.next = firstPendingUpdate;
        }
        currentQueue.lastBaseUpdate = lastPendingUpdate;
      }
    }
  }

  if (firstBaseUpdate !== null) {
    let newState = queue.baseState;

    let newBaseState = null;
    let newFirstBaseUpdate = null;
    let newLastBaseUpdate = null;

    let update = firstBaseUpdate;
    do {
      newState = getStateFromUpdate(workInProgress, queue, update, newState, props, instance);
      update = update.next;
      if (update === null) {
        pendingQueue = queue.shared.pending;
        if (pendingQueue === null) {
          break;
        } else {
          throw new Error('=======todo===========');
        }
      }
    } while (true)

    if (newLastBaseUpdate === null) {
      newBaseState = newState;
    }

    queue.baseState = newBaseState
    queue.firstBaseUpdate = newFirstBaseUpdate;
    queue.lastBaseUpdate = newLastBaseUpdate;

    workInProgress.memoizedState = newState;
  }
}
