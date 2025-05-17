import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import Layout from '../metadata/layout.ts';

export default createDecoratorExp(
  Layout
) as () => Decorator<ClassDecoratorContext>;
