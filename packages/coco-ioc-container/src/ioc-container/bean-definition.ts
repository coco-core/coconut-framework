import {KindClass, KindField} from "../decorator/decorator-context.ts";

export type ClassPostConstructFn = () => void;
export type FieldPostConstructFn = (field: string) => void;
export type PostConstructFn = ClassPostConstructFn | FieldPostConstructFn;

interface ClassPostConstruct {
  kind: typeof KindClass,
  fn: ClassPostConstructFn
}
interface FieldPostConstruct {
  kind: typeof KindField;
  fn: FieldPostConstructFn;
  field: string
}
export type PostConstruct = ClassPostConstruct | FieldPostConstruct;

export default class BeanDefinition<T> {
  name: string;

  cls: Class<T>

  /**
   * 自定义初始化方法
   * new表达式后立刻执行
   */
  postConstruct?: PostConstruct[]
}

export function genClassPostConstruct(fn: ClassPostConstructFn): ClassPostConstruct {
  return {kind: KindClass, fn}
}

export function genFieldPostConstruct(fn: FieldPostConstructFn, field: string): FieldPostConstruct {
  return {kind: KindField, fn, field}
}

export function createBean(beanDefinition: BeanDefinition<any>) {
  const cls = beanDefinition.cls
  const bean = new cls();
  for (const pc of beanDefinition.postConstruct) {
    switch (pc.kind) {
      case KindClass:
        pc.fn.call(bean);
        break;
      case KindField:
        pc.fn.call(bean, pc.field);
        break;
    }
  }
  return bean;
}

