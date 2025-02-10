import { component, Component, webApplication } from 'coco-mvc';
import Router from './component/router.ts';
import Button from './component/button.ts';
import Theme from './component/theme.ts';

@webApplication()
class Application {
  @component()
  router() {
    return new Router();
  }

  @component()
  theme() {
    return new Theme();
  }

  @component(Component.Scope.Prototype)
  button() {
    return new Button();
  }
}

export default Application;
