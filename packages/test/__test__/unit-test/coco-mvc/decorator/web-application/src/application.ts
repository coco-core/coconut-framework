import { bean, Component, webApplication } from 'coco-mvc';
import Router from './component/router.ts';
import Button from './component/button.ts';
import Theme from './component/theme.ts';

@webApplication()
class Application {
  @bean(Router)
  router() {
    return new Router();
  }

  @bean({ value: Theme })
  theme() {
    return new Theme();
  }

  @bean({ value: Button, scope: Component.Scope.Prototype })
  button() {
    return new Button();
  }
}

export default Application;
