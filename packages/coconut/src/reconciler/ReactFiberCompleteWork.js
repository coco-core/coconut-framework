import {ClassComponent, HostComponent} from "./ReactWorkTags";
import {createInstance, finalizeInitialChildren} from "../dom";

function appendAllChildren(parent, workInProgress) {}

function completeWork(
  current,
  workInProgress
) {
  const newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case ClassComponent: {
      return null
    }
    case HostComponent: {
      const type = workInProgress.type;
      const instance = createInstance(
        type,
        newProps
      )
      workInProgress.stateNode = instance;

      finalizeInitialChildren(instance, type, newProps);
      return null;
    }
  }
}

export { completeWork }