import { KindClass, KindField, KindMethod } from './decorator-context.ts';
import {Metadata, Context} from "./export";
import genDecorator from './decorator.ts'

enum Type{
  Class = KindClass,
  Field = KindField,
  Method = KindMethod,
}

type DecoratorArg = Type[]

const target = genDecorator<DecoratorArg, Context>('target')
export default target;

@target([Type.Class], true)
export class Target extends Metadata{
  static Type = Type;

  value: Type[]
}
