import { createDecoratorExp } from '../ioc-container/create-decorator-exp.ts';
import Configuration from '../metadata/configuration.ts';

export default createDecoratorExp<void, ClassDecoratorContext>(Configuration, {
  optional: true,
});
