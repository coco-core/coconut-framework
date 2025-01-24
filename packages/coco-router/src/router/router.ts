import { type Render } from 'coco-mvc';
import type RouteComponentMapper from './route-component-mapper.ts';

abstract class Router {
  public pathname: string;
  public render: Render;

  protected routeComponentMapper: RouteComponentMapper;

  public abstract navigateTo(url: string): void;
}

export default Router;
