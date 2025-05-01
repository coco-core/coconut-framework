import { createDecoratorExp } from 'coco-ioc-container';
import Api from '../metadata/api.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Api, {
  optional: true,
});
