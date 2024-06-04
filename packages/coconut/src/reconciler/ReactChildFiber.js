import {createFiberFromElement, createFiberFromText, createWorkInProgress} from "./ReactFiber";
import {Placement} from "./ReactFiberFlags";
import {REACT_ELEMENT_TYPE} from "../shared/index";


function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      return;
    }
    const deletions = returnFiber.deletions;
    if (deletions === null) {
      returnFiber.deletions = [childToDelete];
      returnFiber.flags |= Deletion;
    } else {
      deletions.push(childToDelete);
    }
  }

  function createChild(
    returnFiber,
    newChild,
  ) {
    if ((typeof newChild === 'string' && newChild !== '') || typeof newChild === 'number') {
      const created = createFiberFromText('' + newChild);
      created.return = returnFiber;
      return created;
    }
    if (typeof newChild === 'object' && newChild !== null) {
      const created = createFiberFromElement(newChild)
      created.return = returnFiber;
      return created;
    }

    return null;
  }

  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.flags |= Placement;
    }
    return newFiber;
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      return lastPlacedIndex;
    }
    const current = newFiber.alternate;
    if (current === null) {
      newFiber.flags |= Placement;
      return lastPlacedIndex;
    }
  }

  function useFiber(fiber, pendingProps) {
    const clone = createWorkInProgress(fiber, pendingProps);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (shouldTrackSideEffects) {
      return null;
    }
    let childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null
  }

  function reconcileSingleElement(
    returnFiber,
    currentFirstChild,
    element,
  ) {
    const key = element.key;
    let child = currentFirstChild;
    while (child !== null) {
      if (child.key === key) {
        if (child.elementType === element.type) {
          deleteRemainingChildren(returnFiber, child.sibling);
          const existing = useFiber(child, element.props);
          existing.return = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    const created = createFiberFromElement(element);
    created.return = returnFiber;
    return created;
  }

  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren
  ){
    let resultingFirstChild = null;
    let previousNewFiber = null;

    let oldFiber = currentFirstChild;
    let lastPlacedIndex = 0;
    let newIdx = 0;
    let nextOldFiber = null;

    if (oldFiber === null) {
      for (; newIdx < newChildren.length; newIdx++){
        let newFiber = createChild(returnFiber, newChildren[newIdx], newIdx);
        if (newFiber === null) {
          continue;
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
      return resultingFirstChild;
    }
  }

  function reconcileChildFibers(
    returnFiber,
    currentFirstChild,
    newChild,
  ) {
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(
              returnFiber,
              currentFirstChild,
              newChild,
            ),
          );
      }

      if (Array.isArray(newChild)) {
        return reconcileChildrenArray(
          returnFiber,
          currentFirstChild,
          newChild
        )
      }
    }

    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);