import {
  Metadata,
  component,
  Component,
  target,
  Target,
} from 'coco-ioc-container';

@target([Target.Type.Field])
@component(Component.Scope.Prototype)
class Ref extends Metadata {}

export default Ref;
