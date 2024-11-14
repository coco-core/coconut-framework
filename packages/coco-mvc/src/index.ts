// @ts-ignore todo fix it
export { render as renderApp } from 'coconut-web';
export {
  bean,
  Bean,
  component,
  Component,
  configuration,
  Configuration,
  scope,
  Scope,
  target,
  Target,
  getClsMetadata,
  genDecorator,
  getFields,
  Metadata,
  ApplicationContext,
} from 'coco-ioc-container';
export { default as reactive, Reactive } from './decorator/reactive.ts';
export { default as view, View } from './decorator/view.ts';
export { default as bind, Bind } from './decorator/bind.ts';

// todo 没有放在这里导出，会导致jest编译报错
// TypeError: (0 , _jsxRuntime.jsx) is not a function
//
//        7 | function getExampleDOM(App) {
//        8 |   const container = document.createElement('div')
//     >  9 |   renderApp(<App />, container)
//          |             ^
//       10 |   return container
//       11 | }
export { jsx, jsxs } from './jsx-runtime/index.ts';

import { _test_helper as iocContainerTestHelper } from 'coco-ioc-container';
const _test_helper = {
  iocContainer: iocContainerTestHelper,
};
if (!__TEST__) {
  // @ts-ignore
  _test_helper.iocContainer = {};
}
export { _test_helper };
