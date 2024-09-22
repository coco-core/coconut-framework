export { render as renderApp } from 'coconut-web';
export {
  component,
  Component,
  target,
  Target,
  scope,
  Scope,
  ScopeType,
  getBean,
  addClassMetadata,
  addFieldMetadata,
  getClsAnnotation,
  genDecorator,
} from 'coco-ioc-container';
export {
  reactive,
  Reactive,
  render,
  Render,
} from './decorator/index';

import {_test_helper as iocContainerTestHelper} from "coco-ioc-container";
let _test_helper = {
  iocContainer: {}
};
if (__TEST__) {
  _test_helper.iocContainer = iocContainerTestHelper
}
export { _test_helper }