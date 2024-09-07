/**
 * 视图层注解
 */
import type {ClassContext} from "coco-ioc-container";
import {addClassMetadata, component, scope, ScopeType} from "coco-ioc-container";

@scope(ScopeType.Prototype)
@component()
export class View{}

// decorator
export default function view(id?: string) {
  return function (value, {kind}: ClassContext) {
    if (kind === 'class') {
      addClassMetadata(value, View, id ?? value.prototype.constructor.name);
    } else {
      throw new Error(`${String(View)}只能装饰类`);
    }
    return value;
  }
}
