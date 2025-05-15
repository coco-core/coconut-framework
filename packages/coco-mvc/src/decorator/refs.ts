import {
  type ApplicationContext,
  createDecoratorExp,
  type Decorator,
} from 'coco-ioc-container';
import Refs from '../metadata/refs.ts';

function postConstruct(
  metadata: Refs,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = {};
}

export default createDecoratorExp(Refs, {
  postConstruct,
}) as () => Decorator<ClassFieldDecoratorContext>;
