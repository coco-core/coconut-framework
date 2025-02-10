import { genDecorator } from 'coco-ioc-container';
import Service from '../metadata/service.ts';

export default genDecorator<string, ClassDecoratorContext>(Service, {
  optional: true,
});
