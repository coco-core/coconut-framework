import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import Render from '../metadata/render.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Render, {
  optional: true,
}) as () => Decorator<ClassDecoratorContext>;
