import {beginWork} from "./ReactFiberBeginWork";
import {Incomplete, NoFlags} from "./ReactFiberFlags";
import {completeWork} from "./ReactFiberCompleteWork";
import {unwindWork} from "./ReactFiberUnwindWork";
import {flushSyncCallbacks, scheduleSyncCallback} from "./ReactFiberSyncTaskQueue";
import {createWorkInProgress} from "./ReactFiber";
import {finishQueuedConcurrentUpdates} from "./ReactFiberConcurrentUpdate";
import {commitMutationEffects} from "./ReactFiberCommitWork";

let workInProgressRoot = null;
let workInProgress = null;

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate;
  const next = beginWork(current, unitOfWork)

  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}

function completeUnitOfWork(unitOfWork) {
  let completedWork = unitOfWork;
  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;

    if ((completedWork.flags & Incomplete) === NoFlags) {
      let next = completeWork(current, completedWork);
      if (next !== null) {
        workInProgress = next;
        return;
      }
    } else {
      const next = unwindWork(current, completedWork);

      if (returnFiber !== null) {
        returnFiber.flags != Incomplete;
        returnFiber.deletions = null
      } else {
        workInProgress = null;
        return;
      }
    }

    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      workInProgress = siblingFiber;
      return;
    }

    completedWork = returnFiber;
    workInProgress = completedWork
  } while (completedWork !== null)
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

function prepareFreshStack(root) {
  workInProgressRoot = root;
  const rootWorkInProgress = createWorkInProgress(root.current, null);
  workInProgress = rootWorkInProgress;


  finishQueuedConcurrentUpdates();
  return workInProgress
}


function renderRootSync(root) {
  if (workInProgressRoot !== root) {
    prepareFreshStack(root);
  }

  do {
    try {
      workLoopSync();
      break;
    } catch (e) {
      console.error(e)
      break;
    }
  } while (true)
}

function commitRootImpl(root) {

  const finishedWork = root.finishedWork;

  commitMutationEffects(root, finishedWork)
}

function commitRoot(root) {
  commitRootImpl(root);
}

function performSyncWorkOnRoot(root) {
  renderRootSync(root)

  const finishedWork = root.current.alternate;
  root.finishedWork = finishedWork;
  commitRoot(root)
  return null;
}

function ensureRootIsScheduled(root) {
  scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
  flushSyncCallbacks();
}

export function flushSync(fn) {
  if (fn) {
    return fn();
  }
  flushSyncCallbacks();
}

export function scheduleUpdateOnFiber(
  root,
  fiber
) {
  ensureRootIsScheduled(root)
}
