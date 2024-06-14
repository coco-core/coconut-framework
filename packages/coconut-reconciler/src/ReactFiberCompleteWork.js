import {ClassComponent, HostComponent, HostRoot} from "./ReactWorkTags";
import {createInstance, finalizeInitialChildren} from "ReactFiberHostConfig";
import {NoFlags} from "./ReactFiberFlags";

function appendAllChildren(parent, workInProgress) {
  let node = workInProgress.child;
  while (node !== null) {
    if (node.tag === HostComponent || node.tag === HostRoot) {
      parent.appendChild(node.stateNode)
    }
    if (node === workInProgress) {
      return;
    }

    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function bubbleProperties(completedWork) {
  let subtreeFlags = NoFlags;
  let child = completedWork.child;
  while (child !== null) {

    subtreeFlags |= child.subtreeFlags;
    subtreeFlags |= child.flags;
    child = child.sibling;
  }
  completedWork.subtreeFlags |= subtreeFlags;
}

function completeWork(
  current,
  workInProgress
) {
  const newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case HostRoot: {
      bubbleProperties(workInProgress)
      return null;
    }
    case ClassComponent: {
      bubbleProperties(workInProgress);
      return null
    }
    case HostComponent: {
      const type = workInProgress.type;
      const instance = createInstance(
        type,
        newProps
      )

      appendAllChildren(instance, workInProgress)
      workInProgress.stateNode = instance;

      finalizeInitialChildren(instance, type, newProps);
      bubbleProperties(workInProgress)
      return null;
    }
  }
}

export { completeWork }