import { createDecoratorExp, Decorator } from 'coco-ioc-container';
import Api from '../metadata/api.ts';

export default createDecoratorExp(
  Api
) as () => Decorator<ClassDecoratorContext>;
