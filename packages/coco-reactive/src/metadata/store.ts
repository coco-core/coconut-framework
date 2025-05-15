import {
  Metadata,
  component,
  Component,
  target,
  Target,
} from 'coco-ioc-container';

/**
 * @public
 */
@target([Target.Type.Class])
@component(Component.Scope.Singleton)
class Store extends Metadata {}

export const sym_remote = Symbol.for('remote');

export default Store;
