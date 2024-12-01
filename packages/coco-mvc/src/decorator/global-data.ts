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
export class GlobalData extends Metadata {}

export default genDecorator<string, ClassContext>(GlobalData, {
  optional: true,
});
