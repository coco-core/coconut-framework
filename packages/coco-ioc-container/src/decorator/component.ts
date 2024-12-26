/**
 * ioc组件，只有ioc组件才能实例化
 * 被@component装饰的组件是ioc组件，被@component装饰的元数据类对应的装饰器装饰的组件也是ioc组件
 */
import genDecorator from './gen-decorator-exp.ts';
import { ClassContext } from './decorator-context.ts';
import Component, { BeanName } from '../metadata/component.ts';

export default genDecorator<BeanName, ClassContext>(Component, {
  optional: true,
});
