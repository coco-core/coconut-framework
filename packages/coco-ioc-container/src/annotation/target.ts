import {Annotation, ContextKind} from "./export";
import genDecorator from './decorator.ts'

export enum TargetType {
  Class = ContextKind.class,
  Field = ContextKind.field,
  Method = ContextKind.method
}

type DecoratorArg = TargetType | TargetType[]

export class Target extends Annotation{
  // 自身不用检查Target作用范围
  static ignoreTargetCheck = true;

  value: TargetType[]

  postConstructor(arg: DecoratorArg) {
    this.value = Array.isArray(arg) ? arg : [arg];
  }
}

export default genDecorator<DecoratorArg>(Target)