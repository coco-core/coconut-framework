import {Metadata, ClassContext, genDecorator, target, Target} from "coco-ioc-container";

enum Type {
  Singleton = 0,
  Prototype = 1
}

@target([Target.Type.Class])
export class Scope extends Metadata {
  static Type = Type;
  value: Type;
}

export default genDecorator<Type, ClassContext>(Scope);

