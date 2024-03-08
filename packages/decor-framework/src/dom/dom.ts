import {VirtualDom} from "../component";

export const deleteChildren = (elm: Element) => {
  const children = elm.children;
  for (let idx = children.length - 1; idx >= 0; idx--) {
    elm.removeChild(children[idx]);
  }
}

const createHtmlElement = (tag: string, children: any) => {
  const element = document.createElement(tag);
  if (typeof children === 'string') {
    element.innerText = children;
  }
  return element;
}

const createClassElement = (vd: VirtualDom) => {
  const constructor = vd.constructor;
  const instance = new constructor();
  const childVD = instance.render();
  vd.instance = instance;
  return createHtmlElement(childVD.tag, childVD.props?.children);
}

export const createChild = (elm: Element, vd: VirtualDom) => {
  const { tag, constructor, props } = vd;
  let child
  if (typeof tag === 'string') {
    child = createHtmlElement(tag, props.children);
  } else if (typeof constructor === 'function') {
    child = createClassElement(vd);
  }
  elm.appendChild(child);
}

