import { genDecorator, type ApplicationContext } from 'coco-ioc-container';
import Remote from '../reactive-autowired/remote.ts';
import Store from '../metadata/store.ts';

export const sym_remote = Symbol.for('remote');

function postConstruct(metadata: Store, appCtx: ApplicationContext) {
  // todo 放在ioc容器里面吧，没必要放在this上
  this[sym_remote] = new Remote(this.constructor);
}

export default genDecorator<string, ClassDecoratorContext>(Store, {
  optional: true,
  postConstruct,
});
