import {Metadata, ClassContext, genDecorator, target} from "./export";
import {TargetType} from "./target.ts";

export enum ScopeType {
  Singleton = 0,
  Prototype = 1
}

type DecoratorArg = ScopeType;

@target(TargetType.Class)
export class Scope extends Metadata {
  value: ScopeType;

  postConstructor(arg: DecoratorArg) {
    this.value = arg;
  }
}

export default genDecorator<DecoratorArg, ClassContext>(Scope);

