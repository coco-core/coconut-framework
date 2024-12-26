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
class Render extends Metadata {}

export default Render;
