// @ts-ignore todo fix it
import { classComponentUpdater, isRenderPhase } from 'coconut-reconciler';
import {Metadata, target, Target, genDecorator, FieldContext} from "coco-ioc-container";

@target([Target.Type.Field])
export class Reactive extends Metadata{}

function postConstructor(name: string) {
  let _value: any = this[name];
  Object.defineProperty(this, name, {
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
        classComponentUpdater.enqueueSetState(this, name, v);
      }
      return true;
    },
  });
}

export default genDecorator(Reactive, { postConstructor })
