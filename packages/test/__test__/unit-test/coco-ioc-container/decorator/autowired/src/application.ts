import { bean, Component, webApplication } from 'coco-mvc';
import Router from './component/router.ts';
import Route from './component/route.ts';

@webApplication()
class Application {
  @bean(Router)
  router() {
    return new Router();
  }

  @bean({ value: Route, scope: Component.Scope.Prototype })
  route() {
    return new Route();
  }
}

export default Application;
