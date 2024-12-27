import Start from '../metadata/start.ts';
import genDecorator from './gen-decorator-exp.ts';

export default genDecorator<undefined, ClassMethodDecoratorContext>(Start, {
  optional: true,
});
