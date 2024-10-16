import type {Class} from './export'
import BeanDefinition, {doCreateBean, PostConstruct} from "./bean-definition.ts";

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
  beanDefinition.postConstruct = [];
  nameDefinitionMap.set(name, beanDefinition);
  clsDefinitionMap.set(cls, beanDefinition);
}

function addPostConstructor(cls: Class<any>, postConstructor: PostConstruct) {
  const definition = clsDefinitionMap.get(cls);
  if (!definition) {
    if(__DEV__) {
      throw new Error("没有对应的cls")
    }
  }
  if (definition.postConstruct.find(i => i.fn === postConstructor.fn)) {
    if(__DEV__) {
      throw new Error("重复的postConstruct")
    }
  }
  definition.postConstruct.push(postConstructor);
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
  return doCreateBean(definition)
}

export {createBean, addDefinition, addPostConstructor, getDefinition}