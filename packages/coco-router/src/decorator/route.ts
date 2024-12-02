import {
  ClassContext,
  Metadata,
  genDecorator,
  component,
  target,
  Target,
  scope,
  Scope,
  type ApplicationContext,
} from 'coco-ioc-container';

@target([Target.Type.Class])
@scope(Scope.Type.Prototype)
@component()
export class Route extends Metadata {
  value: string;
}

function postConstruct(metadata: Route, appCtx: ApplicationContext) {}

export default genDecorator<string, ClassContext>(Route, {
  optional: true,
  postConstruct,
});
