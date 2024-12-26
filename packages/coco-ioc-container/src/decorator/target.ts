import {
  Context,
  KindClass,
  KindField,
  KindMethod,
} from './decorator-context.ts';
import genDecorator from './gen-decorator-exp.ts';

export enum Type {
  Class = KindClass,
  Field = KindField,
  Method = KindMethod,
}

type DecoratorArg = Type[];

const target = genDecorator<DecoratorArg, Context>('target');
export default target;
