import {createUpdate, enqueueUpdate, initializeUpdateQueue, processUpdateQueue} from "./ReactFiberClassUpdateQueue";
import {get, NAME} from "shared";
import { Reactive } from "coco-reactive/metadata";
import {flushSyncCallbacks} from "./ReactFiberSyncTaskQueue";
import { Update } from "./ReactFiberFlags";

const classComponentUpdater = {
  enqueueSetState(inst, field, payload, callback) {
    const fiber = inst._reactInternals; // const fiber = getInstance(inst)

    const update = createUpdate(field);
    update.payload = payload;
    const root = enqueueUpdate(fiber, update);
    if (root !== null) {
      const scheduleUpdateOnFiber = get(NAME.scheduleUpdateOnFiber);
      if (scheduleUpdateOnFiber) {
        scheduleUpdateOnFiber(root, fiber);
      }
    }
  }
}

function adoptClassInstance(workInProgress, instance) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  instance._reactInternals = workInProgress; // setInstance(instance, workInProgress);
}

function constructClassInstance(workInProgress, ctor, props) {
  const appCtx = get(NAME.applicationContext);
  const instance = appCtx.getComponent(ctor);
  const fields = get(NAME.getFields)?.(ctor, Reactive, true);
  workInProgress.memoizedState = fields.reduce((prev, field) => {
    prev[field] = instance[field];
    return prev;
  }, {})
  adoptClassInstance(workInProgress, instance);

  return instance;
}

function mountClassInstance(
  workInProgress,
  ctor,
  newProps
) {
  const instance = workInProgress.stateNode;
  instance.props = newProps;

  initializeUpdateQueue(workInProgress)

  if (typeof instance.viewDidMount === 'function') {
    workInProgress.flags |= Update;
  }
}

function updateClassInstance(
  current,
  workInProgress,
  ctor,
  newProps
) {
  const instance = workInProgress.stateNode;
  const oldState = workInProgress.memoizedState;
  let newState = oldState
  processUpdateQueue(workInProgress, newProps, instance);
  newState = workInProgress.memoizedState;

  instance.props = newProps;
  const fields = get(NAME.getFields)?.(ctor, Reactive, true);
  for (const field of fields) {
    instance[field] = newState[field]
  }

  // todo 新旧state对比，新旧props对比，判断是否需要update

  if (typeof instance.viewDidUpdate === 'function') {
    workInProgress.flags |= Update;
  }

  return true;
}

export {
  classComponentUpdater,
  constructClassInstance,
  mountClassInstance,
  updateClassInstance
}