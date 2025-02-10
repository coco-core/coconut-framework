import ConstructorParam from '../metadata/constructor-param.ts';
import genDecorator from './gen-decorator-exp.ts';

export default genDecorator<void, ClassDecoratorContext>(ConstructorParam, {
  optional: true,
});
