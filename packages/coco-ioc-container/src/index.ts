export {
  Metadata,
  component,
  Component,
  target,
  Target,
  scope,
  Scope,
  ScopeType,
  genDecorator,
} from './metadata/export.ts';
export {
  getBean,
  addClassMetadata,
  addFieldMetadata,
  forceClear_4test,
  getClsAnnotation,
  getFields,
  IocComponent,
} from "./ioc-container/export.ts";

export type {
  FieldContext,
  ClassContext,
} from './metadata/export.ts'

export type {
  Class
} from './ioc-container/export.ts'

import * as decorator from './__test/decorator.ts'
let TEST = { decorator: {}};
if (__TEST__) {
  TEST.decorator = decorator
}
export { TEST }