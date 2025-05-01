import { createDecoratorExp } from 'coco-ioc-container';
import Controller from '../metadata/controller.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Controller, {
  optional: true,
});
