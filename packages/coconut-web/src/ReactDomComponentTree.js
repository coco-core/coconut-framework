const randomKey = Math.random()
  .toString(36)
  .slice(2);
const internalPropsKey = '__reactProps$' + randomKey;

export function getFiberCurrentPropsFromNode(
  node
) {
  return node[internalPropsKey] || null;
}

export function updateFiberProps(
  node,
  props
) {
  node[internalPropsKey] = props;
}