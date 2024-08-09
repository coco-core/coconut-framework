// @ts-ignore
import { classComponentUpdater, isRenderPhase } from 'coconut-reconciler';
// @ts-ignore
import { registerFields, MetaKeyReactive } from 'shared/meta.js';

interface Context {
  kind: 'field';
  name: string | symbol;
  access: { get(): unknown; set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}

function reactive(value, { kind, name, addInitializer }: Context) {
  if (kind === 'field') {
    addInitializer(function () {
      registerFields(this.constructor, MetaKeyReactive, name as string);
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

export { reactive };
