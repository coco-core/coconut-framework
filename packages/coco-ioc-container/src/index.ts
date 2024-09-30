export {
  Metadata,
  component,
  Component,
  target,
  Target,
  self,
  Self,
  scope,
  Scope,
  ScopeType,
  genDecorator,
} from './metadata/export.ts';
export {
  getBean,
  addClassMetadata,
  addFieldMetadata,
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

import * as testHelper from './_test_helper/index.ts'
let _test_helper = {};
if (__TEST__) {
  _test_helper = testHelper
}
export { _test_helper }