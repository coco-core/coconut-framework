import { flushSync, updateContainer, createContainer, } from './ReactFiberReconciler.js';
import { finishQueueingConcurrentUpdates } from './ReactFiberConcurrentUpdate.js';
import { classComponentUpdater } from './ReactFiberClassComponent';
import { isRenderPhase } from "./ReactFiberWorkLoop";

export function updateRender(instance) {
  throw new Error("todo")
}

export { classComponentUpdater, flushSync, updateContainer, createContainer, finishQueueingConcurrentUpdates, isRenderPhase }
