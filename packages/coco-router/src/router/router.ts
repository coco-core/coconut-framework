import { type Render } from 'coco-mvc';
import type RouteComponentMapper from './route-component-mapper.ts';

abstract class Router {
  public routeComponentMapper: RouteComponentMapper;
  public abstract setMapper(mapper: RouteComponentMapper): void;

  public render: Render;
  public abstract setRender(render: Render): void;
}

export default Router;
