import {createUpdate, enqueueUpdate, initializeUpdateQueue, processUpdateQueue} from "./ReactFiberClassUpdateQueue";
import {get, NAME} from "shared";
import {flushSyncCallbacks} from "./ReactFiberSyncTaskQueue";
// todo 这个应该也是通过applicationContext暴露
import {getFields} from "coco-ioc-container";

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
    // todo 这里先用同步刷新，后面再添加调度器
    flushSyncCallbacks();
  }
}

function adoptClassInstance(workInProgress, instance) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  instance._reactInternals = workInProgress; // setInstance(instance, workInProgress);
}

function constructClassInstance(workInProgress, ctor, props) {
  const appCtx = get(NAME.applicationContext);
  const instance = appCtx.getBean(ctor);
  const fields = getFields(ctor, get(NAME.Reactive), true);
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

  const fields = getFields(ctor, get(NAME.Reactive), true);
  for (const field of fields) {
    instance[field] = newState[field]
  }

  return true;
}

export {
  classComponentUpdater,
  constructClassInstance,
  mountClassInstance,
  updateClassInstance
}