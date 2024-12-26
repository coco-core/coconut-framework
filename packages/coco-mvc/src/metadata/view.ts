import {
  Metadata,
  component,
  target,
  Target,
  scope,
  Scope,
} from 'coco-ioc-container';

@target([Target.Type.Class, Target.Type.Method])
@scope(Scope.Type.Prototype)
@component()
class View extends Metadata {}

export default View;
