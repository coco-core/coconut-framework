import ConstructorParam from '../metadata/constructor-param.ts';
import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';

export default createDecoratorExp(
  ConstructorParam
) as () => Decorator<ClassDecoratorContext>;
