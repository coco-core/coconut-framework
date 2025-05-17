import {
  type ApplicationContext,
  createDecoratorExp,
  type Decorator,
} from 'coco-ioc-container';
import Ref from '../metadata/ref.ts';

function postConstruct(
  metadata: Ref,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = { current: null };
}

export default createDecoratorExp(Ref, {
  postConstruct,
}) as () => Decorator<ClassFieldDecoratorContext>;
