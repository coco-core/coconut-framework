import Start from '../metadata/start.ts';
import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';

export default createDecoratorExp<undefined, ClassMethodDecoratorContext>(
  Start,
  {
    optional: true,
  }
) as () => Decorator<ClassMethodDecoratorContext>;
