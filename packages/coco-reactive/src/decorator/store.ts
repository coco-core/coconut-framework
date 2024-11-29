import {
  ClassContext,
  Metadata,
  genDecorator,
  component,
  target,
  Target,
  scope,
  Scope,
  type ApplicationContext,
} from 'coco-ioc-container';
import Remote from '../reactive-autowired/remote.ts';

@target([Target.Type.Class])
@scope(Scope.Type.Singleton)
@component()
export class Store extends Metadata {}

export const sym_remote = Symbol.for('remote');

function postConstruct(metadata: Store, appCtx: ApplicationContext) {
  // todo 放在ioc容器里面吧，没必要放在this上
  this[sym_remote] = new Remote(this.constructor);
}

export default genDecorator<string, ClassContext>(Store, {
  optional: true,
  postConstruct,
});
