import { classComponentUpdater, isRenderPhase } from 'coconut-reconciler';
import {registerReactiveFields} from "shared/meta.js";

interface Context {
  kind: "field";
  name: string | symbol;
  access: { get(): unknown, set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}
type ClassFieldDecorator = (value: undefined, context: Context) => (initialValue: unknown) => unknown | void;

function reactive (value, { kind, name, addInitializer }: Context) {
  if (kind === 'field') {
    addInitializer(function() {
      registerReactiveFields(this.constructor, name as string);
      let _value: any = this[name];
      Object.defineProperty(this, name, {
        configurable: false,
        enumerable: true,
        get: function () {
          return _value;
        },
        set(v: any): boolean {
          /**
           * react的setState只是安排一个updater，真正在beginWork中才会计算并设置state，
           * 我们也是如此，但我们有2个难点：
           * 1. 我们需要区分用户的赋值和coconut自己的赋值
           * 2. 我们是多个state，react确定的一个
           */
          if (isRenderPhase()) {
            // todo 应该是也有可能在触发的，可能还是需要新加一个变量
            _value = v;
          } else {
            classComponentUpdater.enqueueSetState(this, name, v)
          }
          return true;
        },
      });
    })
  } else {
    throw new Error('reactive只能装饰类成员变量')
  }
  return undefined;
}

export { reactive }
