import target, { Target } from './target.ts';
import Metadata from './metadata.ts';
import genDecorator from './decorator.ts';
import { ClassContext } from './decorator-context.ts';

enum Type {
  Singleton = 0,
  Prototype = 1,
}

@target([Target.Type.Class])
export class Scope extends Metadata {
  static Type = Type;
  value: Type;
}

export default genDecorator<Type, ClassContext>(Scope);
