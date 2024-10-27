import { flushSync, updateContainer, createContainer, } from './ReactFiberReconciler.js';
import { finishQueueingConcurrentUpdates } from './ReactFiberConcurrentUpdate.js';
import { classComponentUpdater } from './ReactFiberClassComponent';
import { isRenderPhase } from "./ReactFiberWorkLoop";
import {register, NAME} from "shared/preventCircularDependency";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

export function updateRender(instance) {
  throw new Error("todo")
}

export { classComponentUpdater, flushSync, updateContainer, createContainer, finishQueueingConcurrentUpdates, isRenderPhase }

register(NAME.isRenderPhase, isRenderPhase);
register(NAME.enqueueSetState, classComponentUpdater.enqueueSetState);
register(NAME.scheduleUpdateOnFiber, scheduleUpdateOnFiber);
