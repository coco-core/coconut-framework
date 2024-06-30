import {flushSync, scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";
import {createFiberRoot} from "./ReactFiberRoot";
import {createUpdate, enqueueUpdate} from "./ReactFiberClassUpdateQueue";


export function createContainer(
  container
) {
  return createFiberRoot(container)
}

export function updateContainer(
  element,
  container
) {
  const current = container.current;

  const update = createUpdate('element');
  update.payload = element

  const root = enqueueUpdate(current, update)
  if (root !== null) {
    scheduleUpdateOnFiber(root, current);
  }
}

export { flushSync }