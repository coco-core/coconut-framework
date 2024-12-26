import genDecorator from './gen-decorator-exp.ts';
import { MethodContext } from './decorator-context.ts';
import Init from '../metadata/init.ts';

export default genDecorator<undefined, MethodContext>(Init, { optional: true });
