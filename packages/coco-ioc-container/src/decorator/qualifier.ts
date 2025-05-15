import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';
import Qualifier from '../metadata/qualifier.ts';

export default createDecoratorExp(Qualifier) as (
  clsId: string
) => Decorator<ClassFieldDecoratorContext>;
