import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';
import Init from '../metadata/init.ts';

export default createDecoratorExp(
  Init
) as () => Decorator<ClassMethodDecoratorContext>;
