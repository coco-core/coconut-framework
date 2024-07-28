import { get as getInstance, set as setInstance } from 'shared/ReactInstanceMap.js';
import { getFields, MetaKeyReactive } from "shared/meta.js"
import { protoFunctionsBindThis } from "shared/class-component.js"
import {createUpdate, enqueueUpdate, initializeUpdateQueue, processUpdateQueue} from "./ReactFiberClassUpdateQueue";
import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";
import {flushSyncCallbacks} from "./ReactFiberSyncTaskQueue";

const classComponentUpdater = {
  enqueueSetState(inst, field, payload, callback) {
    const fiber = getInstance(inst)

    const update = createUpdate(field);
    update.payload = payload;
    const root = enqueueUpdate(fiber, update);
    if (root !== null) {
      scheduleUpdateOnFiber(root, fiber);
    }
    console.warn("todo 这里先用同步刷新，后面再添加调度器")
    flushSyncCallbacks();
  }
}

function adoptClassInstance(workInProgress, instance) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  setInstance(instance, workInProgress);
}

function constructClassInstance(workInProgress, ctor, props) {
  let instance = new ctor(props);

  protoFunctionsBindThis(ctor, instance); // todo 移到其他地方，尽量保证reconciler与react-reconciler仓库保持一致
  const fields = getFields(ctor, MetaKeyReactive);
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

  for (const field of getFields(ctor, MetaKeyReactive)) {
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