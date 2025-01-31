import {
  Metadata,
  component,
  Component,
  target,
  Target,
} from 'coco-ioc-container';

@target([Target.Type.Class, Target.Type.Method])
@component(Component.Scope.Prototype)
class View extends Metadata {}

export default View;
