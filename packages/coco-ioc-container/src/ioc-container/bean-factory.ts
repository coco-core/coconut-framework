import BeanDefinition, {
  createBean,
  type FieldPostConstruct,
  type MethodPostConstruct,
  PostConstruct,
  PostConstructFn,
} from './bean-definition.ts';
import { Scope } from '../decorator/scope.ts';
import { getClsMetadata } from './metadata.ts';
import type ApplicationContext from './application-context.ts';
import {
  KindClass,
  KindField,
  KindMethod,
} from '../decorator/decorator-context.ts';

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

function addPostConstruct(cls: Class<any>, pc: PostConstruct) {
  const definition = clsDefinitionMap.get(cls);
  if (!definition) {
    if (__TEST__) {
      throw new Error('没有对应的cls');
    }
  }
  switch (pc.kind) {
    case KindClass:
      if (definition.postConstruct.find((i) => i.fn === pc.fn)) {
        if (__TEST__) {
          throw new Error('重复的postConstruct');
        }
      }
      break;
    case KindField: {
      const pcs = definition.postConstruct as FieldPostConstruct[];
      const fieldPc = pc as FieldPostConstruct;
      if (pcs.find((i) => i.fn === fieldPc.fn && i.field === fieldPc.field)) {
        if (__TEST__) {
          throw new Error('重复的postConstruct');
        }
      }
      break;
    }
    case KindMethod: {
      const pcs = definition.postConstruct as MethodPostConstruct[];
      const fieldPc = pc as MethodPostConstruct;
      if (pcs.find((i) => i.fn === fieldPc.fn && i.field === fieldPc.field)) {
        if (__TEST__) {
          throw new Error('重复的postConstruct');
        }
      }
      break;
    }
  }
  definition.postConstruct.push(pc);
}

function getDefinition(nameOrCls: Class<any> | string) {
  return typeof nameOrCls === 'string'
    ? nameDefinitionMap.get(nameOrCls)
    : clsDefinitionMap.get(nameOrCls);
}

// 单例实例集合
const singletonInstances: Map<Class<any>, any> = new Map();
/**
 * 创建一个ioc组件实例
 * @param nameOrCls 通过class获取或通过name获取；
 * @param appCtx applicationContext实例；
 */
function getBean<T>(
  nameOrCls: Class<T> | string,
  appCtx: ApplicationContext
): T {
  const definition = getDefinition(nameOrCls);
  if (!definition) {
    if (__TEST__) {
      throw new Error(`can no find Bean:${nameOrCls}`);
    }
  }
  const cls = definition.cls;
  const scope: Scope = <Scope>getClsMetadata(cls, Scope);
  const isSingleton = scope?.value === Scope.Type.Singleton;
  if (isSingleton && singletonInstances.has(cls)) {
    return singletonInstances.get(cls);
  }
  const bean = createBean(definition, appCtx);
  if (isSingleton) {
    singletonInstances.set(cls, bean);
  }
  return bean;
}

function clear() {
  nameDefinitionMap.clear();
  clsDefinitionMap.clear();
}

export { getBean, addDefinition, addPostConstruct, getDefinition, clear };
