export * from './ReactDomComponent.js'
export * from './ReactDomHostConfig.js'
import {flushSync, updateContainer, createContainer} from 'coconut-reconciler';

function legacyCreateRootFromDOMContainer(container, children) {
  const root = createContainer(container)
  container._reactRootContainer = root;
  // Initial mount should not be batched.
  flushSync(() => {
    updateContainer(children, root, null, null);
  })
  return root;
}

function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  callback,
) {
  const maybeRoot = container._reactRootContainer;
  let root;
  if (!maybeRoot) {
    legacyCreateRootFromDOMContainer(container, children);
  } else {
    root = maybeRoot;
    updateContainer(children, root, parentComponent, callback);
  }
}

export function render(element, container) {
  return legacyRenderSubtreeIntoContainer(null, element, container, null);
}
