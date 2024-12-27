import { genDecorator } from 'coco-ioc-container';
import Render from '../metadata/render.ts';

export default genDecorator<string, ClassDecoratorContext>(Render, {
  optional: true,
});
