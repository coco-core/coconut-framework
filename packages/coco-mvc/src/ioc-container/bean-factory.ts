import {IocComponent} from "../ioc-component/index";
import {isRegistered, getClsAnnotation} from "./annotation-runtime-config.ts";
import {Scope, ScopeType} from "../annotation/index.ts";

// todo 对于ioc组件仓库的抽象 可以通过id获取ioc组件
const singletonInstances: Map<Class<any>, any> = new Map();

/**
 * 获取Ioc组件
 * 组件可能是单例的，可能是prototype的
 * prototype可能是1:1的，可能是1:N的
 * @param cls
 */
function getBean<T>(cls: Class<T>): T;
// todo function getBean<T>(id: string): T;
function getBean<T>(cls: Class<T>): T {
  if (!cls) {
    console.log('没有传入参数');
    return null;
  }
  if (!isRegistered(cls)) {
    console.error("未注册的组件", cls);
    return null;
  }
  // todo 这里不是找fields，而是找class的annotation里面，有没有scope
  const scope: Scope = <Scope>getClsAnnotation(cls, Scope);
  if (scope?.value === ScopeType.Singleton) {
    const bean = singletonInstances.has(cls);
    if (bean) {
      return singletonInstances.get(cls);
    } else {
      const bean = new cls();
      singletonInstances.set(cls, bean);
      return bean;
    }
  } else {
    const bean = new cls();
    // todo 纳入管理
    return bean;
  }
}


export { getBean }