import { createDecoratorExp } from 'coco-ioc-container';
import Render from '../metadata/render.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Render, {
  optional: true,
});
