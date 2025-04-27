import type { Render } from 'coco-mvc';
import type RouteComponentMapper from './route-component-mapper.ts';
import router from '../decorator/router.ts';

@router()
abstract class Router {
  public pathname: string;
  public params: Record<string, string>; // 动态路由参数
  public render: Render;

  protected constructor() {
    this.params = {};
  }

  protected routeComponentMapper: RouteComponentMapper;

  public abstract navigateTo(url: string): void;
}

export default Router;
