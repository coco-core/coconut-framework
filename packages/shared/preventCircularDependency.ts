/**
 * 用于解决循环依赖的问题
 */
const map = new Map();
export const NAME = {
  isRenderPhase: 'isRenderPhase',
  enqueueSetState: 'enqueueSetState',
  scheduleUpdateOnFiber: 'scheduleUpdateOnFiber',
  addPostConstruct: 'addPostConstruct',
  applicationContext: 'applicationContext',
  // todo 单独暴露出所有的Metadata
  Bean: 'Bean',
  Scope: 'Scope',
  Component: 'Component',
  Reactive: 'Reactive',
  ReactiveAutowired: 'ReactiveAutowired',
  View: 'View',
  Render: 'Render',
};

export function register(name: string, fn: any) {
  if (!map.has(name)) {
    map.set(name, fn);
  } else if (__DEV__) {
    console.warn('不应该重复注册函数', name, fn);
  }
}

export function get(name: string) {
  if (NAME[name]) {
    return map.get(name);
  }
}

export function clear() {
  map.clear();
}
