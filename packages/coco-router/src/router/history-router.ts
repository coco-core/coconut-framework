import router from '../decorator/router.ts';
import { Route } from '../decorator/route.ts';
import { type ApplicationContext } from 'coco-ioc-container';
import RouteMap from './route-map.ts';
import Router from './router.ts';

@router()
class HistoryRouter extends Router {
  render: any;
  routeMap: RouteMap;

  setRender(render: any) {
    this.render = render;
  }

  handleRouteChange = () => {
    const pageComponent = this.routeMap.get(window.location.pathname);
    this.render.render(pageComponent);
  };

  init(appCtx: ApplicationContext) {
    const routeMap = appCtx.getByClassMetadata(Route);
    this.routeMap = new RouteMap();
    this.routeMap.init(routeMap);
    window.addEventListener('popstate', this.handleRouteChange);
  }

  destructor() {
    window.removeEventListener('popstate', this.handleRouteChange);
  }
}

export default HistoryRouter;
