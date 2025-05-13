import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import Router from '../metadata/router.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Router, {
  optional: true,
}) as () => Decorator<ClassDecoratorContext>;
