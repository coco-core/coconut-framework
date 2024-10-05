import {createBean, Class, getClsMetadata, getDefinition} from "coco-ioc-container";
import { Scope, ScopeType } from "../decorator";

// 单例实例集合
const singletonInstances: Map<Class<any>, any> = new Map();

function getBean<T>(cls: Class<T>): T;
function getBean<T>(name: string): T;
function getBean<T>(nameOrCls: Class<T> | string): T{
  const definition = getDefinition(nameOrCls);
  const cls = definition.cls;
  const scope: Scope = <Scope>getClsMetadata(cls, Scope);
  const isSingleton = scope?.value === ScopeType.Singleton;
  if (isSingleton && singletonInstances.has(cls)) {
    return singletonInstances.get(cls);
  }
  const bean = createBean(cls);
  if (isSingleton) {
    singletonInstances.set(cls, bean);
  }
  return bean;
}

export default getBean;


