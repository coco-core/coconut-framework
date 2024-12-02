import { bean, Router, webApplication } from 'coco-mvc';

@webApplication()
class Application {
  @bean(Router)
  router() {
    return new Router();
  }
}

export default Application;
