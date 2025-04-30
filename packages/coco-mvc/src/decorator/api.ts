import { genDecorator } from 'coco-ioc-container';
import Api from '../metadata/api.ts';

export default genDecorator<string, ClassDecoratorContext>(Api, {
  optional: true,
});
