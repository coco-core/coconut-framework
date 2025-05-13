import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import Layout from '../metadata/layout.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Layout, {
  optional: true,
}) as () => Decorator<ClassDecoratorContext>;
