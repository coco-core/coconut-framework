import target, { Target } from './target.ts';
import Metadata from './metadata.ts';
import genDecorator from './decorator.ts';
import { MethodContext } from './decorator-context.ts';
import { Type } from './scope.ts';

export type Args = Class<any> | { cls: Class<any>; scope: Type };

@target([Target.Type.Method])
export class Bean extends Metadata {
  value: Class<any>;

  scope: Type = Type.Singleton;
}

export default genDecorator<Args, MethodContext>(Bean, { optional: true });
