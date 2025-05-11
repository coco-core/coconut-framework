import {
  Context,
  KindClass,
  KindField,
  KindMethod,
} from '../ioc-container/decorator-context.ts';
import { createDecoratorExpByName } from '../ioc-container/create-decorator-exp.ts';

export enum Type {
  Class = KindClass,
  Field = KindField,
  Method = KindMethod,
}

type DecoratorArg = Type[];

const target = createDecoratorExpByName<DecoratorArg, Context>('target');
export default target;
