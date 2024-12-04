/**
 * ioc组件，只有ioc组件才能实例化
 * 被@component装饰的组件是ioc组件，被@component装饰的元数据类对应的装饰器装饰的组件也是ioc组件
 */
import Metadata from './metadata';
import target, { Target } from './target.ts';
import genDecorator from './gen-decorator-exp.ts';
import { ClassContext } from './decorator-context.ts';

export type BeanName = string;

@target([Target.Type.Class])
export class Component extends Metadata {}

export default genDecorator<BeanName, ClassContext>(Component, {
  optional: true,
});
