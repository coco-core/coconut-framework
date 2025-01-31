import { getPropertyInfo } from '../shared/DOMProperty';

export function setValueForProperty(
  node,
  name,
  value,
  oldValue,
) {
  if (name === 'onClick') {
    if (typeof oldValue === 'function') {
      node.removeEventListener('click', oldValue);
    }
    node.addEventListener('click', value);
    return;
  }
  const propertyInfo = getPropertyInfo(name);
  const { attributeName } = propertyInfo;
  if (value === null) {
    node.removeAttribute(attributeName)
  } else {
    let attributeValue = value;
    node.setAttribute(attributeName, attributeValue)
  }
}