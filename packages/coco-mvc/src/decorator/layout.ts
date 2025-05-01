import { createDecoratorExp } from 'coco-ioc-container';
import Layout from '../metadata/layout.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Layout, {
  optional: true,
});
