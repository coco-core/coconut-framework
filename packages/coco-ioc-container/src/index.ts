export {
  Metadata,
  component,
  Component,
  target,
  Target,
  genDecorator,
} from './decorator/export.ts';
export {
  createBean,
  getDefinition,
  addClassMetadata,
  addFieldMetadata,
  getClsMetadata,
  getFields,
  IocComponent,
} from "./ioc-container/export.ts";

export type {
  FieldContext,
  ClassContext,
} from './decorator/export.ts'

export type {
  Class
} from './ioc-container/export.ts'

import * as testHelper from './_test_helper/index.ts'
let _test_helper = testHelper
if (!__TEST__) {
  _test_helper = {} as any;
}
export { _test_helper }