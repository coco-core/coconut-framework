export { default as Render } from './component/render.ts';
export { default as WebRender } from './render/web-render.ts';

import { TestWebRender } from './__tests__';

let _test_helper:
  | {
      TestWebRender: typeof TestWebRender;
    }
  | undefined;

if (__TEST__) {
  _test_helper = {
    TestWebRender,
  };
}

export { _test_helper };
