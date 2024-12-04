import {
  ClassContext,
  Metadata,
  genDecorator,
  target,
  Target,
  type ApplicationContext,
} from 'coco-ioc-container';

@target([Target.Type.Class])
export class Route extends Metadata {
  value: string;
}

function postConstruct(metadata: Route, appCtx: ApplicationContext) {}

export default genDecorator<string, ClassContext>(Route, {
  optional: true,
  postConstruct,
});
