import {
  createDecoratorExp,
  type ApplicationContext,
  type Decorator,
} from 'coco-ioc-container';
import Route from '../metadata/route.ts';

function postConstruct(metadata: Route, appCtx: ApplicationContext) {}

export default createDecoratorExp(Route, {
  postConstruct,
}) as (url: string) => Decorator<ClassDecoratorContext>;
