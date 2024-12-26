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
class GlobalData extends Metadata {}

export default GlobalData;
