export { default as Metadata } from "./decorator/metadata.ts";
export { default as component, Component } from "./decorator/component.ts";
export { default as scope, Scope } from "./decorator/scope.ts"
export { default as target, Target } from "./decorator/target.ts"
export { default as genDecorator} from './decorator/decorator.ts';
export { getBean } from './ioc-container/bean-factory.ts'
export {
  associateClassMetadata,
  associateFieldMetadata,
  getClsMetadata,
  getFields,
} from './ioc-container/metadata.ts'
export {getDefinition} from "./ioc-container/bean-factory.ts";
export {default as ApplicationContext} from "./ioc-container/application-context.ts";

export type {
  FieldContext,
  ClassContext,
} from './decorator/decorator-context.ts'

import * as testHelper from './_test_helper/index.ts'
let _test_helper = testHelper
if (!__TEST__) {
  _test_helper = {} as any;
}
export { _test_helper }