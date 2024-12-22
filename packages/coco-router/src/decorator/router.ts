import {
  ClassContext,
  component,
  genDecorator,
  Metadata,
  Scope,
  scope,
  Target,
  target,
} from 'coco-ioc-container';

@target([Target.Type.Class])
@scope(Scope.Type.Singleton)
@component()
export class Router extends Metadata {}

export default genDecorator<string, ClassContext>(Router, {
  optional: true,
});
