import { component, bean } from 'coco-mvc';
import Router from './router.ts';

@component()
class Application {
  @bean(Router)
  router() {
    return new Router();
  }
}

export default Application;
