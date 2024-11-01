import { PostConstructFn } from '../ioc-container/bean-definition.ts';

// 扫描时暂时保存所有被装饰的类，在容器启动时用来初始化beanDefinition
const tempClsPostConstruct: Map<
  Class<any>,
  { name: string; fns: PostConstructFn[] }
> = new Map();

export function saveClsAndPostConstructTemporary(
  cls: Class<any>,
  name: string,
  fn?: PostConstructFn
) {
  if (!tempClsPostConstruct.has(cls)) {
    tempClsPostConstruct.set(cls, { name, fns: [] });
  }
  const fns = tempClsPostConstruct.get(cls).fns;
  if (!fn || typeof fn !== 'function') {
    return;
  }
  if (!fns.find((i) => i === fn)) {
    fns.push(fn);
  } else {
    // ignore 同一个装饰器装饰了同一个类多次
  }
}

export function get() {
  return tempClsPostConstruct;
}

export function clear() {
  tempClsPostConstruct.clear();
}
