import {
  type ApplicationContext,
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

function init(applicationContext: ApplicationContext) {}

export default genDecorator<string, ClassContext>(Router, {
  optional: true,
  init,
});
