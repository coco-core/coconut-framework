import ConstructorParam from '../metadata/constructor-param.ts';
import { createDecoratorExp } from './create-decorator-exp.ts';

export default createDecoratorExp<void, ClassDecoratorContext>(
  ConstructorParam,
  {
    optional: true,
  }
);
