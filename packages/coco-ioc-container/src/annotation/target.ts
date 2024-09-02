import { KindClass, KindField } from './decorator-context.ts';
import {Annotation, Context} from "./export";
import genDecorator from './decorator.ts'

export enum TargetType{
  Class = KindClass,
  Field = KindField
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

export default genDecorator<DecoratorArg, Context>(Target)