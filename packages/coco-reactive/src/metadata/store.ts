import {
  Metadata,
  component,
  target,
  Target,
  scope,
  Scope,
} from 'coco-ioc-container';

@target([Target.Type.Class])
@scope(Scope.Type.Singleton)
@component()
class Store extends Metadata {}

export const sym_remote = Symbol.for('remote');

export default Store;
