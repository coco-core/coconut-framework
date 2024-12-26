// @ts-ignore todo fix it
import { render as renderApp } from 'coconut-web';
import { init } from 'coco-ioc-container';
import render from '../decorator/render';
import { jsx } from '../jsx-runtime';
import Render from '../component/render.ts';

@render()
class WebRender extends Render {
  container: HTMLElement;

  @init()
  init() {
    if (__TEST__) {
      this.container = document.createElement('div');
    }
  }

  public render(component: any) {
    return renderApp(jsx(component, undefined), this.container);
  }
}

export default WebRender;
