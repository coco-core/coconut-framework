import { VDom } from '../component';

export const deleteChildren = (elm: Element) => {
  const children = elm.children;
  for (let idx = children.length - 1; idx >= 0; idx--) {
    elm.removeChild(children[idx]);
  }
};

export const createElement = (
  tag: string,
  onClick?: Function,
  innerText?: string,
) => {
  const element = document.createElement(tag);
  if (innerText) {
    element.innerText = innerText;
  }
  if (onClick) {
    // todo removeEventListener
    // @ts-ignore
    element.addEventListener('click', onClick);
  }
  return element;
};

export function updateElement(old: VDom, newVd: VDom) {
  const innerText = old.props.innerText;
  const newInnerText = newVd.props.innerText;
  if (innerText !== newInnerText) {
    old.elm!.innerText = newInnerText;
  }
}

export function appendChild(parent: Element, child: Element) {
  parent.appendChild(child);
}
