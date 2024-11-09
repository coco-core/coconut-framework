import { component, bean, Scope } from 'coco-mvc';
import Router from './router.ts';
import Button from './button.ts';
import Theme from './theme.ts';

@component()
class Application {
  @bean(Router)
  router() {
    return new Router();
  }

  @bean({ value: Theme })
  theme() {
    return new Theme();
  }

  @bean({ value: Button, scope: Scope.Type.Prototype })
  button() {
    return new Button();
  }
}

export default Application;
