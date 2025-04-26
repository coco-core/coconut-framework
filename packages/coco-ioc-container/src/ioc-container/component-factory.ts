import IocComponentDefinition, {
  createComponent,
  type FieldPostConstruct,
  type MethodPostConstruct,
  PostConstruct,
  PostConstructFn,
} from './ioc-component-definition.ts';
import { Scope } from '../metadata/component.ts';
import { findComponentMetadata } from './metadata.ts';
import type ApplicationContext from './application-context.ts';
import {
  KindClass,
  KindField,
  KindMethod,
} from '../decorator/decorator-context.ts';
import { isChildClass, uppercaseFirstLetter } from '../share/util.ts';

type Id = string;
const idDefinitionMap: Map<Id, IocComponentDefinition<any>> = new Map();
const clsDefinitionMap: Map<
  Class<any>,
  IocComponentDefinition<any>
> = new Map();

function addDefinition(cls: Class<any>) {
  const existClsDef = clsDefinitionMap.get(cls);
  if (existClsDef) {
    throw new Error(`存在同名的组件: [${existClsDef.cls}] - [${cls}]`);
  }
  const id = uppercaseFirstLetter(cls.name);
  if (typeof id !== 'string' || !id.trim()) {
    throw new Error(`生成组件id失败: [${cls.name}]`);
  }
  const existIdDef = idDefinitionMap.get(id);
  if (existIdDef) {
    throw new Error(`存在id的组件: [${existIdDef.cls}] - [${cls.name}]`);
  }
  const componentDefinition = new IocComponentDefinition();
  componentDefinition.id = id;
  componentDefinition.cls = cls;
  componentDefinition.postConstruct = [];
  idDefinitionMap.set(id, componentDefinition);
  clsDefinitionMap.set(cls, componentDefinition);
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

function getDefinition(
  ClsOrId: Class<any> | Id,
  appCtx: ApplicationContext,
  qualifier?: string
) {
  if (typeof ClsOrId === 'string') {
    return idDefinitionMap.get(ClsOrId);
  }
  const childCls: Class<any>[] = [];
  for (const beDecorated of clsDefinitionMap.keys()) {
    if (isChildClass(beDecorated, ClsOrId)) {
      childCls.push(beDecorated);
    }
  }
  const definition = clsDefinitionMap.get(ClsOrId);
  if (childCls.length === 0) {
    // 没有子组件直接返回本身
    return definition;
  } else if (childCls.length === 1) {
    // 有一个子组件
    return clsDefinitionMap.get(childCls[0]);
  } else {
    // 多个子组件
    let _qualifier = qualifier;
    if (!_qualifier && definition) {
      _qualifier = appCtx.propertiesConfig.getValue(
        `${definition.id}.qualifier`
      );
    }
    if (_qualifier) {
      for (const child of childCls) {
        const def = clsDefinitionMap.get(child);
        if (def.id === _qualifier) {
          return def;
        }
      }
    }
    throw new Error(`不应该存在多个一样的子类组件${ClsOrId}`);
  }
}

// 单例实例集合
const singletonInstances: Map<Class<any>, any> = new Map();
/**
 * 创建一个ioc组件实例
 * @param appCtx applicationContext实例；
 * @param ClsOrId 通过类定义或Id获取；
 * @param rest 其他参数
 */
function getComponent<T>(
  appCtx: ApplicationContext,
  ClsOrId: Class<T> | Id,
  rest: { qualifier?: string; newParameters?: any[] } = {}
): T {
  const { qualifier, newParameters = [] } = rest;
  const definition = getDefinition(ClsOrId, appCtx, qualifier);
  if (!definition) {
    if (__TEST__) {
      throw new Error(`can no find component definition:${ClsOrId}`);
    }
  }
  const cls = definition.cls;
  const metadata = findComponentMetadata(cls);
  const isSingleton = metadata.scope === Scope.Singleton;
  if (isSingleton && singletonInstances.has(cls)) {
    return singletonInstances.get(cls);
  }
  const component = createComponent(appCtx, definition, ...newParameters);
  if (isSingleton) {
    singletonInstances.set(cls, component);
  }
  return component;
}

function clear() {
  idDefinitionMap.clear();
  clsDefinitionMap.clear();
  singletonInstances.clear();
}

export { getComponent, addDefinition, addPostConstruct, clear };
