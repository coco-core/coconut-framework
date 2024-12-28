import { genDecorator } from 'coco-ioc-container';
import Router from '../metadata/router.ts';

export default genDecorator<string, ClassDecoratorContext>(Router, {
  optional: true,
});
