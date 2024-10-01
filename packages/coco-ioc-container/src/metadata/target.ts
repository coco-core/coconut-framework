import { KindClass, KindField } from './decorator-context.ts';
import {Metadata, Context} from "./export";
import genDecorator from './decorator.ts'

export enum TargetType{
  Class = KindClass,
  Field = KindField
}

type DecoratorArg = TargetType | TargetType[]

const {decorator: target, set } = genDecorator<DecoratorArg, Context>('target')
export default target;

@target(TargetType.Class, true)
export class Target extends Metadata{

  value: TargetType[]

  postConstructor(arg: DecoratorArg) {
    this.value = Array.isArray(arg) ? arg : [arg];
  }
}

set(Target);
