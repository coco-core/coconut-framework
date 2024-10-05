export interface Class<T> {
  new (...args: any): T;
}

export { addClassMetadata, addFieldMetadata, getClsMetadata, getFields, clear } from "./metadata-runtime-config.ts";
export { createBean, getDefinition } from './bean-factory'
export { default as IocComponent } from './ioc-component.ts';
