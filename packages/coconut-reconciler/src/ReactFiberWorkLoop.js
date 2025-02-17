import {beginWork} from "./ReactFiberBeginWork";
import {Incomplete, NoFlags} from "./ReactFiberFlags";
import {completeWork} from "./ReactFiberCompleteWork";
import {unwindWork} from "./ReactFiberUnwindWork";
import {flushSyncCallbacks, scheduleSyncCallback} from "./ReactFiberSyncTaskQueue";
import {createWorkInProgress} from "./ReactFiber";
import {finishQueueingConcurrentUpdates} from "./ReactFiberConcurrentUpdate";
import { commitLayoutEffects, commitMutationEffects } from './ReactFiberCommitWork';

export const NoContext = /*             */ 0b000;
const BatchedContext = /*               */ 0b001;
const RenderContext = /*                */ 0b010;
const CommitContext = /*                */ 0b100;

let executionContext = NoContext;
let workInProgressRoot = null;
let workInProgress = null;

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate;
  const next = beginWork(current, unitOfWork)


  unitOfWork.memoizedProps = unitOfWork.pendingProps;
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
        returnFiber.flags |= Incomplete;
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


  finishQueueingConcurrentUpdates();
  return workInProgress
}


function renderRootSync(root) {
  const prevExecutionContext = executionContext;
  executionContext |= RenderContext;

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

  executionContext = prevExecutionContext;

  workInProgressRoot = null;
}

function commitRootImpl(root) {

  const finishedWork = root.finishedWork;
  root.finishedWork = null;
  root.callbackPriority = false;

  commitMutationEffects(root, finishedWork)

  root.current = finishedWork;

  commitLayoutEffects(finishedWork, root)
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
  // Check if there's an existing task. We may be able to reuse it.
  if (root.callbackPriority) {
    return;
  }
  scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
  setTimeout(() => {
    flushSyncCallbacks();
  })
  root.callbackPriority = true;
}

export function flushSync(fn) {
  try {
    if (fn) {
      return fn();
    }
  } finally {
    flushSyncCallbacks();
  }
}

export function scheduleUpdateOnFiber(
  root,
  fiber
) {
  ensureRootIsScheduled(root)
}

export function isRenderPhase() {
  return (executionContext & RenderContext) !== NoContext;
}
