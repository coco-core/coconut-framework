import { component, Component, webApplication } from 'coco-mvc';
import Router from './component/router.ts';
import Button from './component/button.ts';
import Theme from './component/theme.ts';

@webApplication()
class Application {
  @component(Router)
  router() {
    return new Router();
  }

  @component({ value: Theme })
  theme() {
    return new Theme();
  }

  @component({ value: Button, scope: Component.Scope.Prototype })
  button() {
    return new Button();
  }
}

export default Application;
