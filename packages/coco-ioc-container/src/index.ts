export {
  Annotation,
  component,
  Component,
  target,
  Target,
  scope,
  Scope,
  ScopeType,
  genDecorator,
} from './annotation/export.ts';
export {
  getBean,
  addClsAnnotation,
  addFieldAnnotation,
  forceClear_4test,
  getClsAnnotation,
  getFields,
  IocComponent,
} from "./ioc-container/export.ts";

export type {
  FieldContext,
  ClassContext,
} from './annotation/export.ts'

export type {
  Class
} from './ioc-container/export.ts'