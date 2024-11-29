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
import Central from '../reactive-autowired/central.ts';

@target([Target.Type.Class])
@scope(Scope.Type.Singleton)
@component()
export class Store extends Metadata {}

export const sym_source = Symbol.for('source');

function postConstruct(metadata: Store, appCtx: ApplicationContext) {
  this[sym_source] = new Central(this.constructor);
}

export default genDecorator<string, ClassContext>(Store, {
  optional: true,
  postConstruct,
});
