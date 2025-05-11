import { createDecoratorExp } from 'coco-ioc-container';
import View from '../metadata/view.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(View, {
  optional: true,
});
