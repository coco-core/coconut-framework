import { genDecorator } from 'coco-ioc-container';
import View from '../metadata/view.ts';

export default genDecorator<string, ClassMethodDecoratorContext>(View, {
  optional: true,
});
