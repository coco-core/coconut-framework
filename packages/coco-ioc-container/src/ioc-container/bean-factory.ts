import type { Class } from './export'
import BeanDefinition from "./bean-definition.ts";

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

function getDefinition(nameOrCls: Class<any> | string) {
  return typeof nameOrCls === 'string' ? nameDefinitionMap.get(nameOrCls) : clsDefinitionMap.get(nameOrCls);
}

/**
 * 创建一个ioc组件实例
 * 支持通过class获取；支持通过name获取；
 */
function createBean<T>(cls: Class<T>): T;
function createBean<T>(name: string): T;
function createBean<T>(nameOrCls: Class<T> | string): T {
  if (!nameOrCls) {
    throw new Error("未定义的bean");
  }
  const definition = typeof nameOrCls === 'string' ? nameDefinitionMap.get(nameOrCls) : clsDefinitionMap.get(nameOrCls);
  if (!definition) {
    throw new Error("未定义的bean");
  }
  return newBean(definition)
}

function newBean(beanDefinition: BeanDefinition<any>) {
  const cls = beanDefinition.cls
  return new cls();
}

export { createBean, addDefinition, getDefinition }