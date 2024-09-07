import { KindClass, KindField } from './decorator-context.ts';
import {Annotation, Context, target} from "./export";
import genDecorator from './decorator.ts'

export enum TargetType{
  Class = KindClass,
  Field = KindField
}

type DecoratorArg = TargetType | TargetType[]

export default genDecorator<DecoratorArg, Context>(true)

@target(TargetType.Class)
export class Target extends Annotation{

  value: TargetType[]

  postConstructor(arg: DecoratorArg) {
    this.value = Array.isArray(arg) ? arg : [arg];
  }
}
