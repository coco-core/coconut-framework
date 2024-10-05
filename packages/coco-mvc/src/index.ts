export { render as renderApp } from 'coconut-web';
export {
  component,
  Component,
  target,
  Target,
  addClassMetadata,
  addFieldMetadata,
  getClsMetadata,
  genDecorator,
} from 'coco-ioc-container';
export {
  reactive,
  Reactive,
  render,
  Render,
  scope,
  Scope,
} from './decorator/index';
export { default as getBean } from './ioc-component/bean-factory.ts'

import {_test_helper as iocContainerTestHelper} from "coco-ioc-container";
let _test_helper = {
  iocContainer: {}
};
if (__TEST__) {
  _test_helper.iocContainer = iocContainerTestHelper
}
export { _test_helper }