import { getPropertyInfo, shouldIgnoreAttribute } from '../shared/DOMProperty';

export function setValueForProperty(
  node,
  name,
  value,
  isCustomComponentTag,
  oldValue,
) {
  const propertyInfo = getPropertyInfo(name);
  if (shouldIgnoreAttribute(name, propertyInfo)) {
    return;
  }

  if( propertyInfo === null) {
    const attributeName = name;
    if (value === null) {
      node.removeAttribute(attributeName);
    } else {
      node.setAttribute(attributeName, '' + value);
    }
    return;
  }
  const { attributeName } = propertyInfo;
  if (value === null) {
    node.removeAttribute(attributeName)
  } else {
    let attributeValue = value;
    node.setAttribute(attributeName, attributeValue)
  }
}