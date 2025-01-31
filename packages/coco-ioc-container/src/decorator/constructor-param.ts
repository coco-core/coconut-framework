import ConstructorParam, { ClassList } from '../metadata/constructor-param.ts';
import genDecorator from './gen-decorator-exp.ts';

export default genDecorator<ClassList, ClassDecoratorContext>(ConstructorParam);
