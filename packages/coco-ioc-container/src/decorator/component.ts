/**
 * ioc组件，只有ioc组件才能实例化
 * 被@component装饰的组件是ioc组件，被@component装饰的元数据类对应的装饰器装饰的组件也是ioc组件
 */
import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';
import Component, { Scope } from '../metadata/component.ts';

export default createDecoratorExp<
  Scope,
  ClassDecoratorContext | ClassMethodDecoratorContext
>(Component, {
  optional: true,
}) as (
  scope?: Scope
) => Decorator<ClassDecoratorContext | ClassMethodDecoratorContext>;
