import genDecorator from './gen-decorator-exp.ts';
import Qualifier from '../metadata/qualifier.ts';

export default genDecorator<string, ClassFieldDecoratorContext>(Qualifier);
