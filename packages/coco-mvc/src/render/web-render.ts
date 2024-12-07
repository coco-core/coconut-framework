import { render as renderApp } from 'coconut-web';
import render from '../decorator/render';
import { jsx } from '../jsx-runtime';

@render()
class WebRender {
  container: HTMLElement;

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  public render(component: any) {
    return renderApp(jsx(component, undefined), this.container);
  }
}

export default WebRender;
