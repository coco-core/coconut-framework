import { genDecorator } from 'coco-ioc-container';
import Layout from '../metadata/layout.ts';

export default genDecorator<string, ClassDecoratorContext>(Layout, {
  optional: true,
});
