import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import Controller from '../metadata/controller.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Controller, {
  optional: true,
}) as () => Decorator<ClassDecoratorContext>;
