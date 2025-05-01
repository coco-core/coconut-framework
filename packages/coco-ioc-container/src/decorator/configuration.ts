import { createDecoratorExp } from './create-decorator-exp.ts';
import Configuration from '../metadata/configuration.ts';

export default createDecoratorExp<void, ClassDecoratorContext>(Configuration, {
  optional: true,
});
