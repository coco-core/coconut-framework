import target, { Target } from './target.ts';
import Metadata from './metadata.ts';
import genDecorator from './decorator.ts';
import { MethodContext } from './decorator-context.ts';

export type Args = Class<any>;

@target([Target.Type.Method])
export class Bean extends Metadata {}

export default genDecorator<Args, MethodContext>(Bean, { optional: true });
