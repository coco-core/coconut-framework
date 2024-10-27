import { flushSync, updateContainer, createContainer, } from './ReactFiberReconciler.js';
import { finishQueueingConcurrentUpdates } from './ReactFiberConcurrentUpdate.js';
import { classComponentUpdater } from './ReactFiberClassComponent';
import { isRenderPhase } from "./ReactFiberWorkLoop";
import {registerFn} from "shared/decoratorPostConstructorFns";
import {register} from "shared/scheduleUpdateOnFiber";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

export function updateRender(instance) {
  throw new Error("todo")
}

export { classComponentUpdater, flushSync, updateContainer, createContainer, finishQueueingConcurrentUpdates, isRenderPhase }

// todo:12 可以放在统一的地方
registerFn('isRenderPhase', isRenderPhase);
registerFn('enqueueSetState', classComponentUpdater.enqueueSetState);
register(scheduleUpdateOnFiber)
