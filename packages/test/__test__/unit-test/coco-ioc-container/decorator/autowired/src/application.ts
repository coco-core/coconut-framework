import { component, Component, webApplication } from 'coco-mvc';
import Router from './component/router.ts';
import Route from './component/route.ts';

@webApplication()
class Application {
  @component()
  router() {
    return new Router();
  }

  @component(Component.Scope.Prototype)
  route() {
    return new Route();
  }
}

export default Application;
