export {
  Metadata,
  component,
  Component,
  scope,
  Scope,
  target,
  Target,
  genDecorator,
} from './decorator/export.ts';
export {
  getBean,
  getDefinition,
  associateClassMetadata,
  associateFieldMetadata,
  getClsMetadata,
  getFields,
  ApplicationContext,
} from "./ioc-container/export.ts";

export type {
  FieldContext,
  ClassContext,
} from './decorator/export.ts'

import * as testHelper from './_test_helper/index.ts'
let _test_helper = testHelper
if (!__TEST__) {
  _test_helper = {} as any;
}
export { _test_helper }