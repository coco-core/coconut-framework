import {
  createDecoratorExp,
  type ApplicationContext,
  type Decorator,
} from 'coco-ioc-container';
import Route from '../metadata/route.ts';

function postConstruct(metadata: Route, appCtx: ApplicationContext) {}

export default createDecoratorExp<string, ClassDecoratorContext>(Route, {
  optional: true,
  postConstruct,
}) as (url: string) => Decorator<ClassDecoratorContext>;
