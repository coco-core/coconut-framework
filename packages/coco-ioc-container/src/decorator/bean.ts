import genDecorator from './gen-decorator-exp.ts';
import { MethodContext } from './decorator-context.ts';
import Bean, { Args } from '../metadata/bean.ts';

export default genDecorator<Args, MethodContext>(Bean, { optional: true });
