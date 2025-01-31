import {createHostRootFiber} from "./ReactFiber";
import {initializeUpdateQueue} from "./ReactFiberClassUpdateQueue";

function FiberRootNode(
  containerInfo,
) {
  this.containerInfo = containerInfo;
  this.current = null;
  // 我们没有引入lane，使用ture表示有任务在调度，false表示空闲
  this.callbackPriority = false;
}

export function createFiberRoot(
  containerInfo
) {
  const root = new FiberRootNode(containerInfo)
  const uninitializedFiber = createHostRootFiber()
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  initializeUpdateQueue(uninitializedFiber);

  return root;
}

