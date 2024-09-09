const order = [];

export function reset() {
  order.length = 0;
}

export function push(v) {
  order.push(v)
}

export function get() {
  return order;
}
