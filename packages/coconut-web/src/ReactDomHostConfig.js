import {setInitialProperties} from "./ReactDomComponent";

export function shouldSetTextContent(type, props) {
  return (
    typeof props.children === 'string' ||
    typeof props.children === 'number'
  );
}

export function createInstance(type, props) {
  const domElement = document.createElement(type, props);
  return domElement;
}

export function finalizeInitialChildren(domElement, type, props) {
  setInitialProperties(domElement, type, props);
}