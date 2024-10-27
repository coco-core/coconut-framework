import {PostConstructFn} from "../ioc-container/bean-definition.ts";

// 临时保存类装饰器的postConstructFn函数的，在start的时候会挪到BeanDefinition的postConstruct中
const tempClsPostConstruct: Map<Class<any>, { name: string, fn: PostConstructFn }> = new Map();

export function tempAddClsPostConstruct(cls: Class<any>, name: string, fn: PostConstructFn) {
  if (!tempClsPostConstruct.has(cls)) {
    tempClsPostConstruct.set(cls, { name, fn });
  } else {
    // 同一个装饰器装饰了不同的类，但fn是一样的，忽略
  }
}

export function get() {
  return tempClsPostConstruct;
}

export function clear() {
  tempClsPostConstruct.clear();
}
