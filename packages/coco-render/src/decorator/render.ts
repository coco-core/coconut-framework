import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import Render from '../metadata/render.ts';

export default createDecoratorExp(
  Render
) as () => Decorator<ClassDecoratorContext>;
