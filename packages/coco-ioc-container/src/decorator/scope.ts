import target, { Target } from './target.ts';
import Metadata from './metadata.ts';
import genDecorator from './decorator.ts';
import { ClassContext } from './decorator-context.ts';

enum Type {
  // 单例模式
  Singleton = 0,
  // 每次getBean都返回一个新实例
  Prototype = 1,
}

@target([Target.Type.Class])
export class Scope extends Metadata {
  static Type = Type;
  value: Type;
}

export default genDecorator<Type, ClassContext>(Scope);
