import { type Render } from 'coco-mvc';
import type RouteComponentMapper from './route-component-mapper.ts';

abstract class Router {
  public routeComponentMapper: RouteComponentMapper;

  public render: Render;
}

export default Router;
