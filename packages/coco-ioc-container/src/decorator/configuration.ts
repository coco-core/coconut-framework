import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';
import Configuration from '../metadata/configuration.ts';

export default createDecoratorExp(
  Configuration
) as () => Decorator<ClassDecoratorContext>;
