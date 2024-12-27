import genDecorator from './gen-decorator-exp.ts';
import Init from '../metadata/init.ts';

export default genDecorator<undefined, ClassMethodDecoratorContext>(Init, {
  optional: true,
});
