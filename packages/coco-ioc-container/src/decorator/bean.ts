import genDecorator from './gen-decorator-exp.ts';
import Bean, { Args } from '../metadata/bean.ts';

export default genDecorator<Args, ClassMethodDecoratorContext>(Bean, {
  optional: true,
});
