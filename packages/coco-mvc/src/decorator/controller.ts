import { genDecorator } from 'coco-ioc-container';
import Controller from '../metadata/controller.ts';

export default genDecorator<string, ClassDecoratorContext>(Controller, {
  optional: true,
});
