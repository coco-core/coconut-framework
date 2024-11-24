import {
  ClassContext,
  Metadata,
  genDecorator,
  component,
  target,
  Target,
  scope,
  Scope,
} from 'coco-ioc-container';

@target([Target.Type.Class])
@scope(Scope.Type.Singleton)
@component()
export class Store extends Metadata {}

export default genDecorator<string, ClassContext>(Store, { optional: true });
