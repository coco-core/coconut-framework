import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import type { ApplicationContext } from 'coco-ioc-container';
import Bind from '../metadata/bind.ts';

function postConstruct(
  metadata: Bind,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = this[name].bind(this);
}

export default createDecoratorExp(Bind, {
  postConstruct,
}) as () => Decorator<ClassMethodDecoratorContext>;
