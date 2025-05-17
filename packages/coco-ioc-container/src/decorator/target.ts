import {
  Context,
  Decorator,
  KindClass,
  KindField,
  KindMethod,
} from '../ioc-container/decorator-context.ts';
import { createDecoratorExpByName } from '../ioc-container/create-decorator-exp.ts';

/**
 * @public
 */
export enum Type {
  Class = KindClass,
  Field = KindField,
  Method = KindMethod,
}

/**
 * @public
 */
const target: (
  type: Type[],
  decoratorSelf?: true
) => Decorator<ClassDecoratorContext> = createDecoratorExpByName('target');
export default target;
