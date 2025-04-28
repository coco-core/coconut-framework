// @ts-ignore todo fix it
import { render as renderApp } from 'coconut-web';
import { init } from 'coco-ioc-container';
import render from '../decorator/render';
import { jsx } from '../jsx-runtime';
import Render from '../component/render.ts';

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
