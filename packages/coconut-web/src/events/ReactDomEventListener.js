import getListener from './getListener';


function dispatchEvent(domEventName, container, nativeEvent) {
  let currentTarget = nativeEvent.target;
  while (currentTarget !== null && currentTarget !== container) {
    const handler = getListener(currentTarget, 'onClick');
    handler?.()
    currentTarget = currentTarget.parentElement;
  }
}

function dispatchDiscreteEvent(
  domEventName,
  container,
  nativeEvent
) {
  dispatchEvent(domEventName, container, nativeEvent);
}

export function createEventListenerWrapperWithPriority(
  targetContainer,
  domEventName
) {
  return dispatchDiscreteEvent.bind(null, domEventName, targetContainer)
}