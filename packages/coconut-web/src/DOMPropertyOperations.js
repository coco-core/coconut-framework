import { getPropertyInfo } from '../shared/DOMProperty';

export function setValueForProperty(
  node,
  name,
  value
) {
  const propertyInfo = getPropertyInfo(name);

  const { attributeName } = propertyInfo;
  if (value === null) {
    node.removeAttribute(attributeName)
  } else {
    let attributeValue = value;
    node.setAttribute(attributeName, attributeValue)
  }
}