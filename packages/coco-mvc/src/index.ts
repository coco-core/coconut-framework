export * from 'coco-ioc-container';
export { default as Bind } from './metadata/bind.ts';
export { default as bind } from './decorator/bind.ts';
export { default as GlobalData } from './metadata/global-data.ts';
export { default as globalData } from './decorator/global-data.ts';
export { default as View } from './metadata/view.ts';
export { default as view } from './decorator/view.ts';
export { default as WebApplication } from './metadata/web-application.ts';
export { default as webApplication } from './decorator/web-application.ts';
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

export * from 'coco-reactive';
export * from 'coco-router';

export * from './_test_helper';
