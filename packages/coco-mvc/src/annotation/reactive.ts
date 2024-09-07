import { classComponentUpdater, isRenderPhase } from 'coconut-reconciler';
import {Metadata, addFieldMetadata} from "coco-ioc-container";
import type { FieldContext } from "coco-ioc-container";

export class Reactive extends Metadata{}

export default function reactive(value, { kind, name, addInitializer }: FieldContext) {
  if (kind === 'field') {
    addInitializer(function () {
      addFieldMetadata(this.constructor, name as string, Reactive);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let _value: any = this[name];
      Object.defineProperty(this, name, {
        configurable: false,
        enumerable: true,
        get: function () {
          return _value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    });
  } else {
    throw new Error('reactive只能装饰类成员变量');
  }
  return undefined;
}
