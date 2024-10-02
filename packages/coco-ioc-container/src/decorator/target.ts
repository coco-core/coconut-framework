import { KindClass, KindField } from './decorator-context.ts';
import {Metadata, Context} from "./export";
import genDecorator from './decorator.ts'

export enum TargetType{
  Class = KindClass,
  Field = KindField
}

type DecoratorArg = TargetType[]

const target = genDecorator<DecoratorArg, Context>('target')
export default target;

@target([TargetType.Class], true)
export class Target extends Metadata{
  value: TargetType[]
}
