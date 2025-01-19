import { type Render } from 'coco-mvc';
import type RouteComponentMapper from './route-component-mapper.ts';

abstract class Router {
  protected routeComponentMapper: RouteComponentMapper;

  public render: Render;

  public abstract navigateTo(url: string): void;
}

export default Router;
