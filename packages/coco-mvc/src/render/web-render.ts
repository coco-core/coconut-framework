import { render as renderApp } from 'coconut-web';
import render from '../decorator/render';

@render()
class WebRender {
  container: HTMLElement;

  constructor(container: HTMLElement) {}

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  public render(component: any) {
    return renderApp(component, this.container);
  }
}

export default WebRender;
