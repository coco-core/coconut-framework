import router from '../decorator/router.ts';
import { Route } from '../decorator/route.ts';
import { type ApplicationContext } from 'coco-ioc-container';
import RouteComponentMapper from './route-component-mapper.ts';
import Router from './router.ts';

@router()
class HistoryRouter extends Router {
  render: any;
  routeComponentMapper: RouteComponentMapper;

  setRender(render: any) {
    this.render = render;
  }

  handleRouteChange = () => {
    const pageComponent = this.routeComponentMapper.get(
      window.location.pathname
    );
    this.render.render(pageComponent);
  };

  init(appCtx: ApplicationContext) {
    const routeComponentMap = appCtx.getByClassMetadata(Route);
    this.routeComponentMapper = new RouteComponentMapper();
    this.routeComponentMapper.init(routeComponentMap);
    window.addEventListener('popstate', this.handleRouteChange);
  }

  destructor() {
    window.removeEventListener('popstate', this.handleRouteChange);
  }
}

export default HistoryRouter;
