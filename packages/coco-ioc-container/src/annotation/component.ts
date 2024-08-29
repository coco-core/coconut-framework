/**
 * ioc组件
 * 只有ioc组件才能实例化，所以view等注解都需要继承Component类
 */
import {addClsAnnotation} from "../ioc-container/export";
import Annotation from "./abs-annotation";

export class Component extends Annotation{
  // todo 不是id
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

// decorator
export default function component(id?: string){
  return function (value, { kind }: ClassContext) {
    if (kind === 'class') {
      addClsAnnotation(value, Component, id ?? value.prototype.constructor.name);
    } else {
      throw new Error(`${String(Component)}只能装饰类`);
    }
    return undefined;
  }
}