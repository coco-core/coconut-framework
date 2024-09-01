import {Annotation, genDecorator, target} from "./export";
import {TargetType} from "../annotation/target.ts";

export enum ScopeType {
  Singleton = 0,
  Prototype = 1
}

type DecoratorArg = ScopeType;

@target(TargetType.Class)
export class Scope extends Annotation {
  value: ScopeType;

  postConstructor(arg: DecoratorArg) {
    this.value = arg;
  }
}

export default genDecorator<DecoratorArg>(Scope);

