import {
  ClassContext,
  genDecorator,
  type ApplicationContext,
} from 'coco-ioc-container';
import Route from '../metadata/route.ts';

function postConstruct(metadata: Route, appCtx: ApplicationContext) {}

export default genDecorator<string, ClassContext>(Route, {
  optional: true,
  postConstruct,
});
