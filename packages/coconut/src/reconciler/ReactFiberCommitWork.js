import {ClassComponent, HostComponent, HostRoot, HostText} from "./ReactWorkTags";
import {MutationMask, Placement} from "./ReactFiberFlags";


function isHostParent(fiber) {
  return fiber.tag === HostComponent || fiber.tag === HostRoot;
}

function getHostSibling(fiber) {
  let node = fiber;
  siblings: while (true) {
    while (node.sibling === null) {
      if (node.return === null || isHostParent(node.return)) {
        return null;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
    while (node.tag !== HostComponent && node.tag !== HostText) {
      if (node.flags & Placement) {
        continue siblings;
      }
      if (node.child === null) {
        continue siblings;
      } else {
        node.child.return = node;
        node = node.child;
      }
    }
    if (!(node.flags & Placement)) {
      return node.stateNode;
    }
  }
}

function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  const tag = node.tag;
  const isHost = tag === HostComponent || tag === HostText;
  if (isHost) {
    const stateNode = node.stateNode;
    if (before) {
      parent.insertBefore(stateNode, before)
    } else {
      parent.appendChild(stateNode)
    }
  } else {
    const child = node.child;
    if (child !== null) {
      insertOrAppendPlacementNodeIntoContainer(child, before, parent)
      let sibling = child.sibling;
      while (sibling !== null) {
        insertOrAppendPlacementNodeIntoContainer(sibling, before, parent)
        sibling = sibling.sibling
      }
    }
    throw new Error('todo')
  }

}

function getHostParentFiber(fiber) {
  let parent = fiber.return;
  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent;
    }
    parent = parent.return;
  }

  throw new Error(
    'Expected to find a host parent. This error is likely caused by a bug ' +
    'in React. Please file an issue.'
  )
}

function commitPlacement(finishedWork) {
  const parentFiber = getHostParentFiber(finishedWork);
  switch (parentFiber.tag) {
    case HostComponent: {
      const parent = parentFiber.stateNode;
      const before = getHostSibling(finishedWork);
      insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent)
      break;
    }
    case HostRoot: {
      const parent = parentFiber.stateNode.containerInfo;
      const before = getHostSibling(finishedWork);
      insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent)
      break;
    }
  }
}

function recursivelyTraverseMutationEffects(root, parentFiber) {
  if (parentFiber.subtreeFlags & MutationMask) {
    let child = parentFiber.child;
    while (child !== null) {
      commitMutationEffectsOnFiber(child, root)
      child = child.sibling
    }
  }
}

function commitReconciliationEffects(finishedWork) {
  const flags = finishedWork.flags;
  if (flags & Placement) {
    try {
      commitPlacement(finishedWork)
    } catch (e) {

    }
    finishedWork.flags &= ~Placement
  }
}
function commitMutationEffectsOnFiber(
  finishedWork,
  root
) {
  const current = finishedWork.alternate;
  switch (finishedWork.tag) {
    case HostComponent: {
      commitReconciliationEffects(finishedWork)
      return;
    }
    case HostRoot: {
      recursivelyTraverseMutationEffects(root, finishedWork)
      commitReconciliationEffects(finishedWork)
      return
    }
    case ClassComponent: {
      recursivelyTraverseMutationEffects(root, finishedWork)
      commitReconciliationEffects(finishedWork)
      break
    }
  }
}

export function commitMutationEffects(
  root,
  finishedWork
) {
  commitMutationEffectsOnFiber(finishedWork, root)
}