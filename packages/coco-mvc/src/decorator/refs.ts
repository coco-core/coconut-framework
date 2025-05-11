import {
  type ApplicationContext,
  createDecoratorExp,
} from 'coco-ioc-container';
import Refs from '../metadata/refs.ts';

function postConstruct(
  metadata: Refs,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = {};
}

export default createDecoratorExp<void, ClassFieldDecoratorContext>(Refs, {
  postConstruct,
  optional: true,
});
