/**
 * ioc组件
 * 只有ioc组件才能实例化，同时被component装饰的元数据对应的装饰器也可以被实例化
 */
import Metadata from "./metadata";
import target, {Target} from "./target.ts";
import genDecorator from "./decorator.ts";
import {ClassContext} from "./decorator-context.ts";

export type BeanName = string

@target([Target.Type.Class])
export class Component extends Metadata{}

export default genDecorator<BeanName, ClassContext>(Component,  { optional: true })