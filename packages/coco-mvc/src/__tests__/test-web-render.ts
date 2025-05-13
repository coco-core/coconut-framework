// @ts-ignore todo fix it
import { render as renderApp } from 'coconut-web';
import { init } from 'coco-ioc-container';
import render from '../../../coco-render/src/decorator/render';
import { jsx } from '../../../coco-render/src/jsx-runtime';
import Render from '../../../coco-render/src/component/render.ts';

@render()
class TestWebRender extends Render {
  container: HTMLElement;

  @init()
  init() {
    this.container = document.createElement('div');
  }

  public render(component: any) {
    return renderApp(jsx(component, undefined), this.container);
  }
}

export default TestWebRender;
