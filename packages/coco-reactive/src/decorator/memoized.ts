import { createDecoratorExp } from 'coco-ioc-container';
import type { ApplicationContext } from 'coco-ioc-container';
import Subscriber from '../memoized/subscriber.ts';
import Memoized from '../metadata/memoized.ts';

function postConstruct(
  metadata: Memoized,
  appCtx: ApplicationContext,
  name: string
) {
  const fn = this[name];
  const subscriber = new Subscriber(fn.bind(this));
  this[name] = subscriber.memoizedFn;
}

export default createDecoratorExp<void, ClassMethodDecoratorContext>(Memoized, {
  postConstruct,
  optional: true,
});
