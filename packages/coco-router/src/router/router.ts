import { type Render } from 'coco-mvc';

abstract class Router {
  public render: Render;
  public abstract setRender(render: Render): void;
}

export default Router;
