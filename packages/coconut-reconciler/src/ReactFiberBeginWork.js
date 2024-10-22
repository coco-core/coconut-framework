import {mountChildFibers, reconcileChildFibers} from "./ReactChildFiber";
import {ClassComponent, HostComponent, HostRoot, HostText} from "./ReactWorkTags";
import {constructClassInstance, mountClassInstance, updateClassInstance} from "./ReactFiberClassComponent";
import {cloneUpdateQueue, processUpdateQueue} from "./ReactFiberClassUpdateQueue";
import {shouldSetTextContent} from "ReactFiberHostConfig";
/**
 *todo Circular dependency:
 * packages/coco-mvc/src/index.ts ->
 * packages/coconut-web/src/index.js ->
 * packages/coconut-reconciler/src/index.js ->
 * packages/coconut-reconciler/src/ReactFiberReconciler.js ->
 * packages/coconut-reconciler/src/ReactFiberWorkLoop.js ->
 * packages/coconut-reconciler/src/ReactFiberBeginWork.js ->
 * packages/coco-mvc/src/index.ts
 */
import { getFields, View } from "coco-mvc"

export function reconcileChildren(
  current,
  workInProgress,
  nextChildren
) {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
  }
}

function finishClassComponent(
  current,
  workInProgress,
  Component,
  shouldUpdate,
) {
  if (!shouldUpdate) {
    return null;
  }
  const instance = workInProgress.stateNode;
  const fields = getFields(workInProgress.type, View);
  const render = instance[fields[0]];
  const nextChildren = render.call(instance);
  reconcileChildren(current, workInProgress, nextChildren);

  return workInProgress.child;
}

function updateHostRoot(current, workInProgress) {
  const nextProps = workInProgress.pendingProps;
  const prevState = workInProgress.memoizedState;
  cloneUpdateQueue(current, workInProgress);
  processUpdateQueue(workInProgress, nextProps, null);


  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function updateClassComponent(
  current,
  workInProgress,
  Component,
  nextProps
) {
  const instance = workInProgress.stateNode;
  let shouldUpdate = false;
  if (instance === null) {
    constructClassInstance(workInProgress, Component, nextProps);
    mountClassInstance(workInProgress, Component, nextProps);
    shouldUpdate = true;
  } else {
    shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps);
  }

  const nextUnitOfWork = finishClassComponent(
    current,
    workInProgress,
    Component,
    shouldUpdate,
  );
  return nextUnitOfWork;
}

function updateHostComponent(
  current,
  workInProgress
) {
  const type = workInProgress.type;
  const nextProps = workInProgress.pendingProps;
  const prevProps = current !== null ? current.memoizedProps : null;

  let nextChildren = nextProps.children;

  const isDirectTextChild = shouldSetTextContent(type, nextProps);
  if (isDirectTextChild) {
    nextChildren = null;
  }

  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function updateHostText(
  current,
  workInProgress
) {
  return null;
}


function beginWork(
  current,
  workInProgress
) {
  switch (workInProgress.tag) {
    case HostRoot: {
      return updateHostRoot(current, workInProgress);
    }
    case ClassComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        unresolvedProps,
      );
    }
    case HostComponent: {
      return updateHostComponent(current, workInProgress);
    }
    case HostText: {
      return updateHostText(current, workInProgress);
    }
  }

  throw new Error(
    'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.'
  )
}

export { beginWork }