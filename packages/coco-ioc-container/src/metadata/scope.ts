import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from '../metadata/metadata.ts';

export enum Type {
  // 单例模式
  Singleton = 0,
  // 每次getBean都返回一个新实例
  Prototype = 1,
}

@target([Target.Type.Class])
class Scope extends Metadata {
  static Type = Type;
  value: Type = Type.Singleton;
}

export default Scope;
