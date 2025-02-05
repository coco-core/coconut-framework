import { component, Component, webApplication } from 'coco-mvc';
import Router from './component/router.ts';
import Route from './component/route.ts';

@webApplication()
class Application {
  @component(Router)
  router() {
    return new Router();
  }

  @component({ value: Route, scope: Component.Scope.Prototype })
  route() {
    return new Route();
  }
}

export default Application;
