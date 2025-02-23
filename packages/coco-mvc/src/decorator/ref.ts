import { type ApplicationContext, genDecorator } from 'coco-ioc-container';
import Ref from '../metadata/ref.ts';

function postConstruct(
  metadata: Ref,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = { current: null };
}

export default genDecorator<void, ClassFieldDecoratorContext>(Ref, {
  postConstruct,
  optional: true,
});
