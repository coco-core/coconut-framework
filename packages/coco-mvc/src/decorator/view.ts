import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import View from '../metadata/view.ts';

export default createDecoratorExp(
  View
) as () => Decorator<ClassDecoratorContext>;
