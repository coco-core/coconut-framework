import setTextContent from "./setTextContent";

const CHILDREN = 'children';

function setInitialDOMProperties(
  tag,
  domElement,
  rootContainerElement,
  nextProps
) {
  for (const propKey in nextProps) {
    if (!nextProps.hasOwnProperty(propKey)) {
      continue;
    }
    const nextProp = nextProps[propKey];
    if (propKey === CHILDREN) {
      if (typeof nextProp === 'string') {
        setTextContent(domElement, nextProp);
      } else if (typeof nextProp === 'number') {
        setTextContent(domElement, '' + nextProp);
      }
    } else if (propKey === 'onClick') {
      domElement.addEventListener('click', nextProp);
    }
  }
}

export function setInitialProperties(domElement, tag, rawProps) {
  const props = rawProps;
  setInitialDOMProperties(tag, domElement, null, props)
}