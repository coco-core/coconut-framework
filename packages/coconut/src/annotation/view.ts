import { registerFields, getFields, MetaKeyView } from 'shared/meta.js';

interface Context {
  kind: 'field';
  name: string | symbol;
  access: { get(): unknown; set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}
type ClassFieldDecorator = (
  value: undefined,
  context: Context,
) => (initialValue: unknown) => unknown | void;

function view(value, { kind, name, addInitializer }: Context) {
  if (kind === 'field') {
    addInitializer(function () {
      if (__DEV__) {
        const existed = getFields(this.constructor, MetaKeyView);
        if (existed.length) {
          console.error(
            `view不能用于多个函数，自动忽略名为 ${name as string} 的渲染函数`,
          );
          return;
        }
      }
      registerFields(this.constructor, MetaKeyView, name as string);
      return undefined;
    });
  } else {
    throw new Error('view只能装饰类成员变量');
  }
  return undefined;
}

export { view };
