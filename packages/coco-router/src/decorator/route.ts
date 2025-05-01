import {
  createDecoratorExp,
  type ApplicationContext,
} from 'coco-ioc-container';
import Route from '../metadata/route.ts';

function postConstruct(metadata: Route, appCtx: ApplicationContext) {}

export default createDecoratorExp<string, ClassDecoratorContext>(Route, {
  optional: true,
  postConstruct,
});
