import {
  Context,
  KindClass,
  KindField,
  KindMethod,
} from './decorator-context.ts';
import { createDecoratorExpByName } from './create-decorator-exp.ts';

export enum Type {
  Class = KindClass,
  Field = KindField,
  Method = KindMethod,
}

type DecoratorArg = Type[];

const target = createDecoratorExpByName<DecoratorArg, Context>('target');
export default target;
