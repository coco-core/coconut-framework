/**
 * 视图层注解
 */
import {ClassContext, Metadata, genDecorator, component, target, Target, scope, Scope} from "coco-ioc-container";


@target([Target.Type.Class, Target.Type.Field, Target.Type.Method])
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