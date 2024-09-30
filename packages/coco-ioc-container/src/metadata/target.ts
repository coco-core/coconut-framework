import { KindClass, KindField } from './decorator-context.ts';
import {Metadata, Context, self} from "./export";
import genDecorator from './decorator.ts'

export enum TargetType{
  Class = KindClass,
  Field = KindField
}

type DecoratorArg = TargetType | TargetType[]

@self(TargetType.Class)
export class Target extends Metadata{

  value: TargetType[]

  postConstructor(arg: DecoratorArg) {
    this.value = Array.isArray(arg) ? arg : [arg];
  }
}

export default genDecorator<DecoratorArg, Context>(Target)
