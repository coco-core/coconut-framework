import genDecorator from './gen-decorator-exp.ts';
import Bean, { Args } from '../metadata/bean.ts';

// todo !!!不需要入参来标记bean定义的类
export default genDecorator<Args, ClassMethodDecoratorContext>(Bean, {
  optional: true,
});
