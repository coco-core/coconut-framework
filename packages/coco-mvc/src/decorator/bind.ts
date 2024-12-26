import { genDecorator } from 'coco-ioc-container';
import type { ApplicationContext, MethodContext } from 'coco-ioc-container';
import Bind from '../metadata/bind.ts';

function postConstruct(
  metadata: Bind,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = this[name].bind(this);
}

export default genDecorator<void, MethodContext>(Bind, {
  postConstruct,
  optional: true,
});
