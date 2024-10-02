import {Metadata, ClassContext, genDecorator, target, TargetType} from "coco-ioc-container";

export enum ScopeType {
  Singleton = 0,
  Prototype = 1
}

type DecoratorArg = ScopeType;

@target([TargetType.Class])
export class Scope extends Metadata {
  value: ScopeType;
}

export default genDecorator<DecoratorArg, ClassContext>(Scope);

