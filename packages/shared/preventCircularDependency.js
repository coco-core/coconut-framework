/**
 * 用于解决循环依赖的问题
 */
const fns = new Map();
export const NAME = {
  isRenderPhase: 'isRenderPhase',
  enqueueSetState: 'enqueueSetState',
  scheduleUpdateOnFiber: 'scheduleUpdateOnFiber',
  addPostConstruct: 'addPostConstruct'
}

export function register(name, fn) {
  if (!fns.has(name)) {
    fns.set(name, fn)
  } else if (__DEV__) {
    console.warn("不应该重复注册函数", name, fn);
  }
}

export function get(name) {
  if (NAME[name]) {
    return fns.get(name);
  }
}