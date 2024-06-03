export * from './ReactDomComponent.js'
export * from './ReactDomHostConfig.js'
import { VDom } from '../component';
import {initRender, flushSync, updateContainer, createContainer} from '../reconciler';

export interface Container {
  elm: HTMLElement;
  render: (vd: VDom) => void;
  // 当前页面对应的vdom
  vdom?: VDom;
}

function legacyCreateRootFromDOMContainer(container, children) {
  const root = createContainer(container)
  container._reactRootContainer = root;
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
    root = legacyCreateRootFromDOMContainer(container, children);
  }
}

export function render(element, container) {
  return legacyRenderSubtreeIntoContainer(null, element, container, null);
}
