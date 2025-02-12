import {createFiberFromElement, createFiberFromText, createWorkInProgress} from "./ReactFiber";
import {Deletion, Forked, Placement} from "./ReactFiberFlags";
import {REACT_ELEMENT_TYPE} from "shared";
import {HostText} from "./ReactWorkTags";

function coerceRef(
  returnFiber,
  current,
  element
) {
  const mixedRef = element.ref;
  if (
    mixedRef !== null &&
    typeof mixedRef !== "object"
  ) {
    throw new Error(
      'Expected ref to be an object returned by React.createRef(), or null.',
    );
  }
  return mixedRef;
}

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
      created.ref = coerceRef(returnFiber, null, newChild);
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
      newFiber.flags |= Forked;
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
    if (!shouldTrackSideEffects) {
      return null;
    }
    let childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null
  }

  function updateElement(
    returnFiber,
    current,
    element
  ) {
    const elementType = element.type;
    if (current !== null) {
      if (current.elementType === elementType) {
        const existing = useFiber(current, element.props);
        existing.ref = coerceRef(returnFiber, current, element);
        existing.return = returnFiber;
        return existing;
      }
    }
  }

  function updateTextNode(
    returnFiber,
    current,
    textContent
  ) {
    if (current === null || current.tag !== HostText) {
      const created = createFiberFromText(textContent)
      created.return = returnFiber;
      return created;
    } else {
      const existing = useFiber(current, textContent);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateSlot(
    returnFiber,
    oldFiber,
    newChild
  ) {
    const key = oldFiber !== null ? oldFiber.key : null;
    if (
      (typeof newChild === 'string' && newChild !== "") ||
      typeof newChild === 'number'
    ) {
      if (key !== null) {
        return null
      }
      return updateTextNode(returnFiber, oldFiber, '' + newChild);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          if (newChild.key === key) {
            return updateElement(returnFiber, oldFiber, newChild);
          } else {
            return null;
          }
        }
      }
    }
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
          existing.ref = coerceRef(returnFiber, child, element);
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
    created.ref = coerceRef(returnFiber, currentFirstChild, element);
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
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      const newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx]
      )
      if (newFiber === null) {
        break;
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        resultingFirstChild = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

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