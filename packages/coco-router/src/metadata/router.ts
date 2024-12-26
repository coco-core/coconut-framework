import {
  component,
  Metadata,
  Scope,
  scope,
  Target,
  target,
} from 'coco-ioc-container';

@target([Target.Type.Class])
@scope(Scope.Type.Singleton)
@component()
class Router extends Metadata {}

export default Router;
