export * from 'coco-ioc-container';
import { register, NAME } from 'shared';
export { default as bind, Bind } from './decorator/bind.ts';
export { default as globalData, GlobalData } from './decorator/global-data.ts';
import { default as view, View } from './decorator/view.ts';
export { view, View };
export {
  default as webApplication,
  WebApplication,
} from './decorator/web-application.ts';
export { default as Render } from './component/render.ts';
export { default as WebRender } from './render/web-render.ts';

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

register(NAME.View, View);

export * from 'coco-reactive';
export * from 'coco-router';

export * from './_test_helper';
