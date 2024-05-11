import { updateRender } from '../reconciler';

interface Context {
  kind: "field";
  name: string | symbol;
  access: { get(): unknown, set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}
type ClassFieldDecorator = (value: undefined, context: Context) => (initialValue: unknown) => unknown | void;

export const _factory = (cb: Function): ClassFieldDecorator => {
  return function (value, { kind, name, addInitializer }: Context) {
    if (kind === 'field') {
      addInitializer(function() {
        let innerValue: any = this[name];
        Object.defineProperty(this, name, {
          enumerable: true,
          configurable: true,
          get: function () {
            return innerValue;
          },
          set(v: any): boolean {
            innerValue = v;
            cb(this);
            return true;
          },
        });
      })
    } else {
      throw new Error('reactive只能装饰类成员变量')
    }
    return undefined;
  }
}

export const reactive = _factory(updateRender);
