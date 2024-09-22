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
  forceClear_4test
} from 'coco-ioc-container';
export {
  reactive,
  Reactive,
  render,
  Render,
} from './decorator/index';

import {TEST as CONTAINER_TEST} from "coco-ioc-container";
let TEST = {};
if (__TEST__) {
  TEST = CONTAINER_TEST
}
export { TEST }