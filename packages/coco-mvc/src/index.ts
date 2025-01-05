export * from 'coco-ioc-container';
export * from 'coco-reactive';
export * from 'coco-router';
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

// todo 拿出去
export { jsx, jsxs } from './jsx-runtime/index.ts';
export * from './_test_helper';
