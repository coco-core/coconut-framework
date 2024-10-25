import {PostConstruct, PostConstructFn} from "../ioc-container/bean-definition.ts";

// 临时保存类装饰器的postConstructFn函数的，在start的时候会挪到BeanDefinition的postConstruct中
const tempClsPostConstruct: Map<Class<any>, { name: string, fn: PostConstructFn }> = new Map();

export function tempAddClsPostConstruct(cls: Class<any>, name: string, fn: PostConstructFn) {
  if (!tempClsPostConstruct.has(cls)) {
    tempClsPostConstruct.set(cls, { name, fn });
  } else {
    // 同一个装饰器装饰了不同的类，忽略
  }
}

export function get() {
  return tempClsPostConstruct;
}

export function clear() {
  tempClsPostConstruct.clear();
}

// 作为decorator和bean-factory的共同底层，防止依赖循环
let fieldPostConstruct: (cls: Class<any>, postConstructor: PostConstruct) => void;
export function registerFieldPostConstruct(addPostConstructor: (cls: Class<any>, postConstructor: PostConstruct) => void) {
  fieldPostConstruct = addPostConstructor;
}

export function callFieldPostConstruct(cls: Class<any>, postConstructor: PostConstruct) {
  if (fieldPostConstruct) {
    fieldPostConstruct(cls, postConstructor);
  } else if (__DEV__) {
    console.error("不应该走到这里")
  }
}

