// @ts-ignore todo fix it
import { render as renderApp } from 'coconut-web';
import render from '../decorator/render';
import { jsx } from '../jsx-runtime';
import Render from './render.ts';

@render()
class WebRender extends Render {
  container: HTMLElement;

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  public render(component: any) {
    return renderApp(jsx(component, undefined), this.container);
  }
}

export default WebRender;
