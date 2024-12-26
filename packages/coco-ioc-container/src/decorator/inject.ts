import Inject, { Args } from '../metadata/inject.ts';
import genDecorator from './gen-decorator-exp.ts';
import { MethodContext } from './decorator-context.ts';

export default genDecorator<Args, MethodContext>(Inject);
