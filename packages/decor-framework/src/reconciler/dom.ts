import {VirtualDom} from "../component";

export const deleteChildren = (elm: Element) => {
  const children = elm.children;
  for (let idx = children.length - 1; idx >= 0; idx--) {
    elm.removeChild(children[idx]);
  }
}

export const createChild = (elm: Element, vd: VirtualDom) => {
  const { tag, props } = vd;
  const element = document.createElement(tag);
  if (typeof props.children === 'string') {
    element.innerText = props.children;
  }
  elm.appendChild(element);
}

