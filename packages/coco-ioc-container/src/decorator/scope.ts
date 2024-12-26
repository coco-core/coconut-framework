import Scope, { Type } from '../metadata/scope.ts';
import genDecorator from './gen-decorator-exp.ts';
import { ClassContext } from './decorator-context.ts';

export default genDecorator<Type, ClassContext>(Scope);
