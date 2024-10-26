const map = new Map();

/**
 * 注册
 * @param name 'isRenderPhase' | 'enqueueSetState'
 * @param fn
 */
export function registerFn(name, fn) {
  map.set(name, fn);
}

export function get(name) {
  return map.get(name);
}