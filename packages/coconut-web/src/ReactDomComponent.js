import setTextContent from "./setTextContent";
import { setValueForProperty } from './DOMPropertyOperations';

const CHILDREN = 'children';
const STYLE = 'style';

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
    } else if (nextProp != null) {
      setValueForProperty(domElement, propKey, nextProp)
    }
  }
}

export function createTextNode(text) {
  return document.createTextNode(text)
}

export function setInitialProperties(domElement, tag, rawProps) {
  const props = rawProps;
  setInitialDOMProperties(tag, domElement, null, props)
}

export function diffProperties(
  domElement,
  tag,
  lastRawProps,
  nextRawProps
) {
  let updatePayload = null;
  let lastProps = lastRawProps;
  let nextProps = nextRawProps;

  let propKey;
  let styleName;
  let styleUpdates;
  for (propKey in lastProps) {
    if (
      nextProps.hasOwnProperty(propKey) ||
      !lastProps.hasOwnProperty(propKey) ||
      lastProps[propKey] == null
    ) {
      continue;
    }
    if (propKey === STYLE) {

    } else {
      (updatePayload = updatePayload || []).push(propKey, null)
    }
  }
  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (
      !nextProps.hasOwnProperty(propKey) ||
      nextProp === lastProp ||
      (nextProp == null && lastProp == null)
    ) {
      continue;
    }
    if (propKey === STYLE) {
    } else if (propKey === CHILDREN) {
      if (typeof nextProp === 'string' || typeof nextProp === 'number') {
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, nextProp)
    }
  }
  return updatePayload;
}

function updateDOMProperties(
  domElement,
  updatePayload,
  wasCustomComponentTag,
  isCustomComponentTag,
  lastRawProps,
) {
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];
    const oldPropValue = lastRawProps[propKey];
    if (propKey === STYLE) {
    } else if (propKey === CHILDREN) {
      setTextContent(domElement, propValue)
    } else {
      setValueForProperty(domElement, propKey, propValue, oldPropValue);
    }
  }
}

export function updateProperties(
  domElement,
  updatePayload,
  tag,
  lastRawProps,
  nextRawProps
) {
  updateDOMProperties(
    domElement,
    updatePayload,
    false,
    false,
    lastRawProps,
  )
}
