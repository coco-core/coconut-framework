import { configuration, component, Component } from 'coco-mvc';
import Router from './router.ts';
import Button from './button.ts';
import Theme from './theme.ts';

@configuration()
class WebAppConfiguration {
  @component(Router)
  router() {
    return new Router();
  }

  @component({ value: Button, scope: Component.Scope.Prototype })
  button() {
    return new Button();
  }

  @component({ value: Theme })
  theme() {
    return new Theme();
  }
}

export default WebAppConfiguration;
