/**
 * 视图层注解
 */
import {ClassContext, Metadata, genDecorator, component, target, Target} from "coco-ioc-container";
import scope, { Scope } from "./scope.ts";


@target([Target.Type.Class])
@scope(Scope.Type.Prototype)
@component()
export class View extends Metadata{}

function postConstructor() {
  const fns = Object.getOwnPropertyNames(this.constructor.prototype);
  for (const fn of fns) {
    if (fn === 'constructor') {
      continue;
    }
    this[fn] = this[fn].bind(this);
  }
}

export default genDecorator<string, ClassContext>(View, { optional: true, postConstructor });