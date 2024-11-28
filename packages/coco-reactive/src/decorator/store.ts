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
import Source from '../reactive-autowired/source.ts';

@target([Target.Type.Class])
@scope(Scope.Type.Singleton)
@component()
export class Store extends Metadata {}

function postConstruct(
  metadata: Store,
  appCtx: ApplicationContext,
  name: string
) {
  this[`source`] = new Source();
}

export default genDecorator<string, ClassContext>(Store, {
  optional: true,
  postConstruct,
});
