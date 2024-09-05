import {isRegistered, getClsAnnotation} from "./annotation-runtime-config.ts";
import {Scope, ScopeType} from "../annotation/export.ts";
import type { Class } from './export'
import BeanDefinition from "./bean-definition.ts";

// 单例实例集合
const singletonInstances: Map<Class<any>, any> = new Map();

const nameDefinitionMap: Map<string, BeanDefinition<any>> = new Map();
const clsDefinitionMap: Map<Class<any>, BeanDefinition<any>> = new Map();

/**
 * 保存一个bean定义
 * @param name
 * @param cls
 */
function addDefinition(name: string, cls: Class<any>) {
  const exited = nameDefinitionMap.get(name);
  if (exited) {
    throw new Error(`存在同名的bean: [${exited.cls}] - [${cls}]`);
  }
  const beanDefinition = new BeanDefinition();
  beanDefinition.name = name;
  beanDefinition.cls = cls;
  nameDefinitionMap.set(name, beanDefinition);
  clsDefinitionMap.set(cls, beanDefinition);
}

/**
 * 获取Ioc组件实例
 * 支持通过class获取；支持通过name获取；
 * 如果ioc组件定义是单例，则先找缓存，有的话直接返回，否则实例化后缓存并返回
 * 如果定义是prototype，则实例化后直接返回
 */
function getBean<T>(cls: Class<T>): T;
function getBean<T>(name: string): T;
function getBean<T>(nameOrCls: Class<T> | string): T {
  if (!nameOrCls) {
    throw new Error("未定义的bean");
  }
  if ((typeof nameOrCls === 'string' && !nameDefinitionMap.has(nameOrCls)) ||
    (typeof nameOrCls !== 'string' && !clsDefinitionMap.has(nameOrCls))) {
    throw new Error("未定义的bean");
  }
  const definition = typeof nameOrCls === 'string' ? nameDefinitionMap.get(nameOrCls) : clsDefinitionMap.get(nameOrCls);
  const cls = definition.cls;
  const scope: Scope = <Scope>getClsAnnotation(cls, Scope);
  const isSingleton = scope?.value === ScopeType.Singleton;
  if (isSingleton && singletonInstances.has(cls)) {
    return singletonInstances.get(cls);
  }
  const bean = newBean(definition)
  if (isSingleton) {
    singletonInstances.set(cls, bean);
  }
  return bean;
}

function newBean(beanDefinition: BeanDefinition<any>) {
  const cls = beanDefinition.cls
  return new cls();
}

export { getBean, addDefinition }