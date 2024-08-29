import IocComponent from "./ioc-component";

/**
 * 视图组件
 */
export class Component<T> extends IocComponent<T>{
  constructor(clazz: Class<T>) {
    super();
    // todo
    this.type = clazz
  }

  protoFunctionsBindThis = (ins: T) => {
    const fns = Object.getOwnPropertyNames(this.type.prototype);
    for (const fn of fns) {
      if (fn === 'constructor') {
        continue;
      }
      ins[fn] = this.type.prototype[fn].bind(ins);
    }
  }

  newInstance(props?: any) {
    const instance = new this.type(props);
    this.protoFunctionsBindThis(instance); // todo 移到其他地方，尽量保证reconciler与react-reconciler仓库保持一致
    return instance
  }
}