import Scope, { Type } from '../metadata/scope.ts';
import genDecorator from './gen-decorator-exp.ts';

export default genDecorator<Type, ClassDecoratorContext>(Scope);
