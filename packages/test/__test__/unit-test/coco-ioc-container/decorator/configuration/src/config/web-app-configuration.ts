import { configuration, bean, Component } from 'coco-mvc';
import Router from './router.ts';
import Button from './button.ts';
import Theme from './theme.ts';

@configuration()
class WebAppConfiguration {
  @bean(Router)
  router() {
    return new Router();
  }

  @bean({ value: Button, scope: Component.Scope.Prototype })
  button() {
    return new Button();
  }

  @bean({ value: Theme })
  theme() {
    return new Theme();
  }
}

export default WebAppConfiguration;
