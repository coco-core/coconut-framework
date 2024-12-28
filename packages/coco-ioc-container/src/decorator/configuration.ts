import genDecorator from './gen-decorator-exp.ts';
import Configuration from '../metadata/configuration.ts';

export default genDecorator<void, ClassDecoratorContext>(Configuration, {
  optional: true,
});
