import {
  Context,
  KindClass,
  KindField,
  KindMethod,
} from './decorator-context.ts';
import genDecorator from './gen-decorator-exp.ts';
import Metadata from './metadata.ts';

enum Type {
  Class = KindClass,
  Field = KindField,
  Method = KindMethod,
}

type DecoratorArg = Type[];

const target = genDecorator<DecoratorArg, Context>('target');
export default target;

@target([Type.Class], true)
export class Target extends Metadata {
  static Type = Type;

  value: Type[];
}
