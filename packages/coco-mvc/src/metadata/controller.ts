import {
  Metadata,
  component,
  Component,
  target,
  Target,
} from 'coco-ioc-container';

@target([Target.Type.Class])
@component(Component.Scope.Prototype)
class Controller extends Metadata {}

export default Controller;
