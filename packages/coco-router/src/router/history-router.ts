import router from '../decorator/router.ts';
import { Route } from '../decorator/route.ts';
import {
  type ApplicationContext,
  parameter,
  init,
  start,
} from 'coco-ioc-container';
import RouteComponentMapper from './route-component-mapper.ts';
import Router from './router.ts';
import { get, NAME } from 'shared';
import { type Render } from 'coco-mvc';

@router()
class HistoryRouter extends Router {
  @parameter([get(NAME.Render)])
  instantiate(render: Render) {
    this.render = render;
  }

  handleRouteChange = () => {
    const pageComponent = this.routeComponentMapper.get(
      window.location.pathname
    );
    this.render.render(pageComponent);
  };

  @init()
  init(appCtx: ApplicationContext) {
    const routeComponentMap = appCtx.getByClassMetadata(Route);
    this.routeComponentMapper = new RouteComponentMapper();
    this.routeComponentMapper.init(routeComponentMap);
  }

  @start()
  addListener() {
    window.addEventListener('popstate', this.handleRouteChange);
  }

  removeListener() {
    window.removeEventListener('popstate', this.handleRouteChange);
  }
}

export default HistoryRouter;
