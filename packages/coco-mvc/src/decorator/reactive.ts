// @ts-ignore todo fix it
import { classComponentUpdater, isRenderPhase } from 'coconut-reconciler';
import {Metadata, target, Target, genDecorator, FieldContext} from "coco-ioc-container";

@target([Target.Type.Field])
export class Reactive extends Metadata{}

function initializer(instance: any, context: FieldContext) {
  const name = context.name;
  let _value: any = instance[name];
  Object.defineProperty(instance, name, {
    configurable: false,
    enumerable: true,
    get: function () {
      return _value;
    },
    set(v: any): boolean {
      if (isRenderPhase()) {
        // todo 应该是也有可能在触发的，可能还是需要新加一个变量
        _value = v;
      } else {
        classComponentUpdater.enqueueSetState(instance, name, v);
      }
      return true;
    },
  });
}

export default genDecorator(Reactive, { initializer })
