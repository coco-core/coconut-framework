import target, { Target } from './target.ts';
import Metadata from './metadata.ts';
import genDecorator from './gen-decorator-exp.ts';
import { MethodContext } from './decorator-context.ts';

export type Args = Class<any>[];

@target([Target.Type.Method])
export class Parameter extends Metadata {
  value: Class<any>[];
}

export default genDecorator<Args, MethodContext>(Parameter);
