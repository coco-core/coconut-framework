import { genDecorator } from 'coco-ioc-container';
import WebApplication from '../metadata/web-application.ts';

export default genDecorator<void, ClassDecoratorContext>(WebApplication, {
  optional: true,
});
