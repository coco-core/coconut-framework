import { createDecoratorExp } from 'coco-ioc-container';
import WebApplication from '../metadata/web-application.ts';

export default createDecoratorExp<void, ClassDecoratorContext>(WebApplication, {
  optional: true,
});
