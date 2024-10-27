import BeanDefinition, {createBean, PostConstruct, PostConstructFn} from "./bean-definition.ts";
import {Scope} from "../decorator/scope.ts";
import {getClsMetadata} from "./metadata.ts";
import {registerFieldPostConstruct} from "./application-context-start-helper-post-construct.ts";

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

function addPostConstruct(cls: Class<any>, postConstruct: PostConstruct) {
  const definition = clsDefinitionMap.get(cls);
  if (!definition) {
    if(__DEV__) {
      throw new Error("没有对应的cls")
    }
  }
  if (definition.postConstruct.find(i => i.fn === postConstruct.fn)) {
    if(__DEV__) {
      throw new Error("重复的postConstruct")
    }
  }
  definition.postConstruct.push(postConstruct);
}
// todo:12 可以放在统一的地方
registerFieldPostConstruct(addPostConstruct);

function getDefinition(nameOrCls: Class<any> | string) {
  return typeof nameOrCls === 'string' ? nameDefinitionMap.get(nameOrCls) : clsDefinitionMap.get(nameOrCls);
}

// 单例实例集合
const singletonInstances: Map<Class<any>, any> = new Map();
/**
 * 创建一个ioc组件实例
 * 支持通过class获取；支持通过name获取；
 */
function getBean<T>(cls: Class<T>): T;
function getBean<T>(name: string): T;
function getBean<T>(nameOrCls: Class<T> | string): T{
  const definition = getDefinition(nameOrCls);
  const cls = definition.cls;
  const scope: Scope = <Scope>getClsMetadata(cls, Scope);
  const isSingleton = scope?.value === Scope.Type.Singleton;
  if (isSingleton && singletonInstances.has(cls)) {
    return singletonInstances.get(cls);
  }
  const bean = createBean(definition)
  if (isSingleton) {
    singletonInstances.set(cls, bean);
  }
  return bean;
}

export {getBean, addDefinition, addPostConstruct, getDefinition}