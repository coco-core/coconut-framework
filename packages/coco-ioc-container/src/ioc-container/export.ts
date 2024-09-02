export interface Class<T> {
  new (...args: any): T;
}

export { addClsAnnotation, addFieldAnnotation, getClsAnnotation, getFields, forceClear_4test } from "./annotation-runtime-config.ts";
export { getBean } from './bean-factory'
export { default as IocComponent } from './ioc-component.ts';
