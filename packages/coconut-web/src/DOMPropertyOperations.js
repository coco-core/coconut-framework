import { getPropertyInfo } from '../shared/DOMProperty';

export function setValueForProperty(
  node,
  name,
  value
) {
  if (name === 'onClick') {
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