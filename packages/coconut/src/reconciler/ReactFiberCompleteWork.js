import {ClassComponent, HostComponent} from "./ReactWorkTags";

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
      // const instance = createInstance(
      //   type,
      //   newProps
      // )
      // appendAllChildren(instance, workInProgress)
    }
  }
}

export { completeWork }