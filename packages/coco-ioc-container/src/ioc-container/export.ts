export interface Class<T> {
  new (...args: any): T;
}

export { addClassMetadata, addFieldMetadata, getClsAnnotation, getFields, forceClear_4test } from "./metadata-runtime-config.ts";
export { getBean } from './bean-factory'
export { default as IocComponent } from './ioc-component.ts';
