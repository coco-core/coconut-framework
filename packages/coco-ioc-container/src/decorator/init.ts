import { createDecoratorExp } from '../ioc-container/create-decorator-exp.ts';
import Init from '../metadata/init.ts';

export default createDecoratorExp<undefined, ClassMethodDecoratorContext>(
  Init,
  {
    optional: true,
  }
);
